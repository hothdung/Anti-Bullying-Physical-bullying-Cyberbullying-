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

class LocationOutsideManager: NSObject {

    let locationManager = CLLocationManager()
    var delegate: LocationOutsideDelegate
    let authorizationStatus = CLLocationManager.authorizationStatus()
    
    // setting up the delegate
    init(delegate:LocationOutsideDelegate){
        self.delegate = delegate
        super.init()

        // location service is "on" on users device
        if CLLocationManager.locationServicesEnabled() {
            locationManager.delegate = self
            // fast, but lower accuracy
            locationManager.desiredAccuracy =  kCLLocationAccuracyBest
            checkLocationAuthorization(status: authorizationStatus)
        }
    }
    
    func checkLocationAuthorization(status: CLAuthorizationStatus){
        
        switch status {
        case .notDetermined:
            locationManager.requestWhenInUseAuthorization()
        case .restricted, .denied:
            print("Location data is not available")
        case .authorizedAlways, .authorizedWhenInUse:
            locationManager.startUpdatingLocation()
        default:
            break
        }
    }
}

extension LocationOutsideManager: CLLocationManagerDelegate {

    // whenever authorization changes we want to check for state
    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        checkLocationAuthorization(status: status)
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        // just interested in last and recent location in loc array
        guard let location = locations.last else{ return }
        // pass location data in delegate
        delegate.processNewLocation(newLocation: location)
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        guard let locationError = error as? CLError else {
            print("other error: ", error.localizedDescription)
            return
        }

        switch locationError {
        case CLError.locationUnknown:
            delegate.processLocationFailure(error: locationError as NSError)
            print("location unknown")
        case CLError.denied:
            delegate.processLocationFailure(error: locationError as NSError)
            print("denied")
        default:
            delegate.processLocationFailure(error: locationError as NSError)
            print("other Core Location error")
        }
        
        delegate.processLocationFailure(error: locationError as NSError)
    }
}

