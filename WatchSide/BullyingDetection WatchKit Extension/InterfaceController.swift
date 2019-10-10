//
//  InterfaceController.swift
//  BullyingDetection WatchKit Extension
//
//  Created by Dung Ho and Jaeyoung Kim
//  Copyright © 2019 호탄융, 김재영. All rights reserved.
//
import WatchKit
import Foundation
import CoreLocation
import HealthKit
import AVFoundation
import CoreMotion



let hrType:HKQuantityType = HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.heartRate)!

// Date will be constructed in database --> server side


class InterfaceController: WKInterfaceController,LocationOutsideDelegate,MovementDelegate{
    
    var saveUrl: URL?
   // instance of locationOutside exist already at runtime
    var locationManager: LocationOutsideManager!
    // Outlets for testing
    @IBOutlet weak var button: WKInterfaceButton!
    @IBOutlet weak var furtherSigLabels: WKInterfaceLabel!
    var settings = [String : Any]()
    
    // distinguish start recording heartbeat
    var isRecording = false
    
    //For workout session
    let healthStore = HKHealthStore()
    var session: HKWorkoutSession?
    var currentQuery: HKQuery?
    var filename: String?
    var motionManager: MovementManager!
    var movement: String = ""

    
    var manualLat: Double = 0.0
    var manualLong: Double = 0.0
    var heartRateVal: Double = 0.0
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        // initialize locationManager
         locationManager = LocationOutsideManager(delegate: self)
        motionManager = MovementManager(delegate: self)
        
        // managing authorization
        let healthService:HealthDataService = HealthDataService()
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
        
    }
    
  func processNewLocation(newLocation: CLLocation) {
        let latitude = newLocation.coordinate.latitude
        let longitude = newLocation.coordinate.longitude
        print("Latitude \(latitude)")
        print("Longitude \(longitude)")
    }
    func processLocationFailure(error: NSError) {
        print(error)
    }
    
    
    override func willActivate() {
        // This method is called when watch view controller is about to be visible to user
        super.willActivate()
        motionManager.startUpdatingMotions()
    }
    
    func evalMovForSending(toSend: Bool, gravStr: String, accelStr: String, rotationStr: String, attStr: String){
        var tmp = "\(gravStr), \(accelStr), \(rotationStr), \(attStr), "
        if toSend{
            print("Student has fallen down!")
            movement = "\(tmp) _1"
            print(movement)
        }else{
            movement = "\(tmp) _2"
            print(movement)
        }
    }
    
    override func didDeactivate() {
        // This method is called when watch view controller is no longer visible
        super.didDeactivate()
        motionManager.stopUpdatingMotions()
    }
   
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
            startWorkout() //Start workout session/healthkit streaming
        }else{
            let exitTitle = NSMutableAttributedString(string: "Start Recording")
            exitTitle.setAttributes([NSAttributedString.Key.foregroundColor: UIColor.red], range: NSMakeRange(0, exitTitle.length))
            button.setAttributedTitle(exitTitle)
            isRecording = false
            healthStore.end(session!)
            
        }
        
    }
    
}

extension InterfaceController: HKWorkoutSessionDelegate{
    func workoutSession(_ workoutSession: HKWorkoutSession, didChangeTo toState: HKWorkoutSessionState, from fromState: HKWorkoutSessionState, date: Date) {
        switch toState {
        case .running:
            //print(date)
            if let query = heartRateQuery(date){
                self.currentQuery = query
                healthStore.execute(query)
            }
        //Execute Query
        case .ended:
            //Stop Query
            healthStore.stop(self.currentQuery!)
            session = nil
        default:
            print("Unexpected state: \(toState)")
        }
    }
    
    func workoutSession(_ workoutSession: HKWorkoutSession, didFailWithError error: Error) {
        //Do Nothing
    }
    
    func startWorkout(){
        // If a workout has already been started, do nothing.
        if (session != nil) {
            return
        }
        // Configure the workout session.
        let workoutConfiguration = HKWorkoutConfiguration()
        workoutConfiguration.activityType = .running
        workoutConfiguration.locationType = .outdoor
        
        do {
            session = try HKWorkoutSession(configuration: workoutConfiguration)
            session?.delegate = self
        } catch {
            fatalError("Unable to create workout session")
        }
        
        healthStore.start(self.session!)
        //print("Start Workout Session")
        
    }
    
    func heartRateQuery(_ startDate: Date) -> HKQuery? {
        let datePredicate = HKQuery.predicateForSamples(withStart: startDate, end: nil, options: .strictEndDate)
        let predicate = NSCompoundPredicate(andPredicateWithSubpredicates:[datePredicate])
        
        let heartRateQuery = HKAnchoredObjectQuery(type: hrType, predicate: predicate, anchor: nil, limit: Int(HKObjectQueryNoLimit)) { (query, sampleObjects, deletedObjects, newAnchor, error) -> Void in
            //Do nothing
        }
        
        heartRateQuery.updateHandler = {(query, samples, deleteObjects, newAnchor, error) -> Void in
            guard let samples = samples as? [HKQuantitySample] else {return}
            DispatchQueue.main.async {
                guard let sample = samples.first else { return }
                
                // after extraction of bpm value conversion to double
                let value = sample.quantity.doubleValue(for: HKUnit(from: "count/min"))
                
                //print("Type of value is +\(type(of:value))")
                
                let request = NSMutableURLRequest(url: NSURL(string: "http://147.46.242.219/addall.php")! as URL)
                request.httpMethod = "POST"
                //print(self.movement)
                //let randomStr = 42.0
                let postString = "gps_x=\(self.manualLat)&gps_y=\(self.manualLong)&a=\(self.movement)&hr=\(value)"
                //print(postString)
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
                
                //print("This line is executed!")
                //print(String(UInt16(value)))
            }
            
        }
        
        return heartRateQuery
    }
    

}

class HealthDataService {
    internal let healthKitStore:HKHealthStore = HKHealthStore()
    
    init() {}
    
    func authorizeHealthKitAccess(_ completion: ((_ success:Bool, _ error:Error?) -> Void)!) {
        let typesToShare = Set([hrType])
        let typesToSave = Set([hrType])
        healthKitStore.requestAuthorization(toShare: typesToShare, read: typesToSave) { (success, error) in
            completion(success, error)
        }
    }
}


