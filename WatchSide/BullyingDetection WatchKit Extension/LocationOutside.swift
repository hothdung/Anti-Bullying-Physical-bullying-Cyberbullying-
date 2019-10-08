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
    var currentLoc = LocationSet()
    var delegate: LocationOutsideDelegate
    
        init(delegate:LocationOutsideDelegate){
        self.delegate = delegate
        super.init()
        locationManager.requestWhenInUseAuthorization()
        locationManager.desiredAccuracy =  kCLLocationAccuracyBest
        locationManager.delegate = self
        //locationManager.requestAlwaysAuthorization()
        //locationManager.startUpdatingLocation()
            
    }
    
    func requestLocation(){
        let authorizationStatus = CLLocationManager.authorizationStatus()
        switch authorizationStatus{
        case .notDetermined:
            print("requested location not determined")
        case .authorizedWhenInUse:
            locationManager.requestLocation()
        case .denied:
            print("requested location denied")
        default:
            print("default requested location")
        }
        
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: LocationSet) {
        currentLoc += [locations[0]]
        delegate.processNewLocation(newLocation: locations[0])
    }
    
    func locationManager(_manager: CLLocationManager,didFailWithError error: Error){
        if let clErr = error as? CLError {
            switch clErr {
            case CLError.locationUnknown:
                delegate.processLocationFailure(error: clErr as NSError)
                print("location unknown")
            case CLError.denied:
                delegate.processLocationFailure(error: clErr as NSError)
                print("denied")
            default:
                delegate.processLocationFailure(error: clErr as NSError)
                print("other Core Location error")
            }
        } else {
            print("other error:", error.localizedDescription)
        }
        }
    func resetLocations(){
        currentLoc = []
    }
}

