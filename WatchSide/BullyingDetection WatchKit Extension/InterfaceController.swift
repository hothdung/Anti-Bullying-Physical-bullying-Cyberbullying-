//
//  InterfaceController.swift
//  BullyingDetection WatchKit Extension
//
//  Created by Dung Ho and Jaeyoung Kim
//  Copyright © 2019 호탄융, 김재영. All rights reserved.
//
import WatchKit
import Foundation
import HealthKit
import AVFoundation
import CoreMotion


// generate a short unique id
struct ShortCodeGenerator {

    private static let base62chars = [Character]("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
    private static let maxBase : UInt32 = 62

    static func getCode(withBase base: UInt32 = maxBase, length: Int) -> String {
        var code = ""
        for _ in 0..<length {
            let random = Int(arc4random_uniform(min(base, maxBase)))
            code.append(base62chars[random])
        }
        return code
    }
}

// Date will be constructed in database --> server side
class InterfaceController: WKInterfaceController {

    var saveUrl: URL?

    // instance of locationOutside exist already at runtime
    var locationManager: LocationOutsideManager!
    let healthService: HealthDataService = HealthDataService()
    var heartRateManager: HeartRateManager!

    // Outlets for testing
    @IBOutlet weak var button: WKInterfaceButton!
    @IBOutlet weak var furtherSigLabels: WKInterfaceLabel!
    var settings = [String : Any]()
    
    // distinguish start recording heartbeat
    var isRecording = false
    
    //For workout session
    var currentQuery: HKQuery?
    var filename: String?
    var motionManager: MovementManager!
    var movement: String = ""

    
    var manualLat: Double = 0.0
    var manualLong: Double = 0.0
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        healthService.authorizeHealthKitAccess { (success, error) in
            if success {
                print("HealthKit authorization received.")
            } else {
                print("HealthKit authorization denied!")
                if error != nil {
                    print("\(String(describing: error))")
                }
            }
        }
        heartRateManager = HeartRateManager(delegate: self)
        
        // initialize locationManager
        locationManager = LocationOutsideManager(delegate: self)
        motionManager = MovementManager(delegate: self)
    }

    override func willActivate() {
        // This method is called when watch view controller is about to be visible to user
        super.willActivate()
        motionManager.startUpdatingMotions()
    }

    override func didDeactivate() {
        // This method is called when watch view controller is no longer visible
        super.didDeactivate()
        motionManager.stopUpdatingMotions()
    }
    
    func sendToServer(params : Dictionary<String, String>){
        guard let url = URL(string:"http://13.125.244.168:80") else
        { print("URL could not be created")
            return
        }
        let requestBody = try? JSONSerialization.data(withJSONObject: params,  options: [])
       
        var urlRequest = URLRequest(url: url)
        //urlRequest.timeoutInterval = 240
        urlRequest.httpMethod = "POST"
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
        urlRequest.setValue("application/json", forHTTPHeaderField: "Accept")
        urlRequest.httpBody = requestBody
        
        let session = URLSession.shared
        
        let task = session.dataTask(with: urlRequest) { (data, response, error) in
            if let error = error {
                print("error:", error)
                return
            }

            do {
                guard let data = data else { return }
                guard let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: AnyObject] else { return }
                print("json:", json)
            } catch {
                print("error:", error)
            }
        }
        task.resume()
    }

    @IBAction func manualBtnPressed() {
        // manual reporting functionality
        // generating 6 character long unique id

        let uniqueId = ShortCodeGenerator.getCode(length: 6)
        let txtMsg = "I am student \(uniqueId). I need help!"
        print(txtMsg)

        if manualLat != 0.0 && manualLong != 0.0 {
            var latStr = String(format:"%.2f",manualLat)
            var longStr = String(format:"%.2f",manualLong)
            let request = NSMutableURLRequest(url: NSURL(string: "http://147.46.242.219/addmanual.php")! as URL)
            request.httpMethod = "POST"
            let postString = "a=\(manualLat)&b=\(manualLong)&c=\(txtMsg)"
            print(postString)
            request.httpBody = postString.data(using: .utf8)

            let task = URLSession.shared.dataTask(with: request as URLRequest) {
                data, response, error in

                if error != nil {
                    //print("error=\(error)")
                    return
                }

                //print("response = \(response)")

                let responseString = NSString(data: data!, encoding: String.Encoding.utf8.rawValue)
                //print("responseString = \(responseString)")
            }

            task.resume()
        }
    }

    // when button clicked label is shown
    @IBAction func btnPressed() {

        if(!isRecording){
            let stopTitle = NSMutableAttributedString(string: "Stop Recording")
            stopTitle.setAttributes([NSAttributedString.Key.foregroundColor: UIColor.red], range: NSMakeRange(0, stopTitle.length))
            button.setAttributedTitle(stopTitle)
            isRecording = true
            heartRateManager.startWorkout() //Start workout session/healthkit streaming
        } else {
            let exitTitle = NSMutableAttributedString(string: "Start Recording")
            exitTitle.setAttributes([NSAttributedString.Key.foregroundColor: UIColor.red], range: NSMakeRange(0, exitTitle.length))
            button.setAttributedTitle(exitTitle)
            isRecording = false
            heartRateManager.stopWorkout()
            //healthStore.end(session!)

        }

    }

}


extension InterfaceController: LocationOutsideDelegate {

    func processNewLocation(newLocation: CLLocation) {
        let latitude = newLocation.coordinate.latitude
        let longitude = newLocation.coordinate.longitude
        print("Latitude \(latitude)")
        print("Longitude \(longitude)")
        
        let stringFrLat = "\(latitude)"
        let stringFrLong = "\(longitude)"
        var locationData = ["latitude": stringFrLat, "longitude":stringFrLong] as Dictionary<String,String>
        sendToServer(params: locationData)
    }

    func processLocationFailure(error: NSError) {
        print(error)
    }
}


extension InterfaceController: HeartRateManagerDelegate {

    func handleNewHeartRate(newHeartRate: Double) {
        print("New Heartrate \(newHeartRate)")
    }
}


extension InterfaceController: MovementDelegate {

    func evalMovForSending(toSend: Bool, gravStr: String, accelStr: String, rotationStr: String, attStr: String){
    
        let tmp = "\(gravStr), \(accelStr), \(rotationStr), \(attStr), "
        if toSend{
            print("Student has fallen down!")
            movement = "\(tmp) _1"
            print(movement)
        }else{
            movement = "\(tmp) _2"
            print(movement)
        }
    }

}





