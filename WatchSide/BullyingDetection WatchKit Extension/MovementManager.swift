//
//  MovementManager.swift
//  BullyingDetection WatchKit Extension
//
//  Created by Dung Ho on 10.10.19.
//  Copyright © 2019 Dung Ho. All rights reserved.
//

import WatchKit
import Foundation
import CoreMotion

protocol MovementDelegate{
    func startUpdatingMotions()
    func stopUpdatingMotions()
    func getCoordinates(x:Double, y:Double, z:Double)
    func evalMovForSending(toSend: Bool) -> Bool
}

class MovementManager: NSObject{
    
    let motionManager = CMMotionManager()
    let queue = OperationQueue()
    var delegate:MovementDelegate
    var prev_grav_z: Double
    var prev_acc_z: Double
    var grav_x:Double
    var grav_y:Double
    var grav_z:Double
    var acc_x:Double
    var acc_y:Double
    var acc_z:Double
    var sendOrNot:Bool
    
    var gravityStr = ""
    var userAccelerStr = ""
    var rotationRateStr = ""
    var attitudeStr = ""
    
    init(delegate:MovementDelegate){
    self.delegate = delegate
    self.prev_grav_z = 0.0
    self.prev_acc_z = 0.0
    self.grav_x = 0.0
    self.grav_y = 0.0
    self.grav_z = 0.0
    self.acc_x = 0.0
    self.acc_y = 0.0
    self.acc_z = 0.0
    self.sendOrNot = false
    self.gravityStr = ""
    self.userAccelerStr = ""
    self.rotationRateStr = ""
    self.attitudeStr = ""
    super.init()
            
    motionManager.deviceMotionUpdateInterval = 0.5
    }
    
}
