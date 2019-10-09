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

class LocationOutsideManager: NSObject,CLLocationManagerDelegate{
    let locationManager = CLLocationManager()
    var delegate: LocationOutsideDelegate
    
    // setting up the delegate 
    init(delegate:LocationOutsideDelegate){
        self.delegate = delegate
        super.init()
        
        // location service is "on" on users device
        if CLLocationManager.locationServicesEnabled(){
        locationManager.delegate = self
        // fast, but lower accuracy
        locationManager.desiredAccuracy =  kCLLocationAccuracyBest
        checkLocationAuthorization()
        }
    }
    
    func checkLocationAuthorization(){
        switch CLLocationManager.authorizationStatus(){
        case .authorizedWhenInUse:
            print("allow app to retrieve location when app active")
            locationManager.startUpdatingLocation()
            break
        case .denied:
            print("disallowed selected cannot query location data of user")
            break
        case .notDetermined:
            locationManager.requestWhenInUseAuthorization()
            break
        case .restricted:
            print("constrained control of querying location data")
            break
        case .authorizedAlways:
            print("give permission for app to get location data when app active or in background")
            break
        default:
            print("default value")
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        // just interested in last and recent location in loc array
        guard let location = locations.last else{return}
        // pass location data in delegate
        delegate.processNewLocation(newLocation: location)
       }
       
    // whenever authorization changes we want to check for state
       func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
           checkLocationAuthorization()
       }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
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
        delegate.processLocationFailure(error: error as NSError)
    }
}
