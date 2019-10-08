//
//  LocationOutside.swift
//  BullyingDetection WatchKit Extension
//
//  Created by Dung Ho on 06.10.19.
//  Copyright © 2019 Dung Ho. All rights reserved.
//

import WatchKit
import Foundation
import CoreLocation

protocol LocationOutsideDelegate {
    func processNewLocation(newLocation:CLLocation)
    func processLocationFailure(error:NSError)
}

class LocationOutside: NSObject,CLLocationManagerDelegate{
    
    var locationManager: CLLocationManager = CLLocationManager()
    //var currentLocations = LocationSet()
    var delegate: LocationOutsideDelegate
    
        init(delegate:LocationOutsideDelegate){
        self.delegate = delegate
        super.init()
        locationManager.requestWhenInUseAuthorization()
        locationManager.desiredAccuracy =  kCLLocationAccuracyHundredMeters
        locationManager.delegate = self
            if CLLocationManager.authorizationStatus() == .notDetermined{
                locationManager.requestWhenInUseAuthorization()
            }
    }
    
    func requestLocation(){
        
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let currentLoc =  locations[0]
        let lat = currentLoc.coordinate.latitude
        let long = currentLoc.coordinate.longitude
        print(lat)
        print(long)

    }
    
    func locationManager(_manager: CLLocationManager,didFailWithError error: Error){
        if let locationErr = error as? CLError{
            switch locationErr{
            case CLError.locationUnknown:
                print("unknown location")
            case CLError.denied:
                print("denied")
            default:
                print("another type of location error")
            }
        }else{
                print("other error: ", error.localizedDescription)
            }
        }
}

