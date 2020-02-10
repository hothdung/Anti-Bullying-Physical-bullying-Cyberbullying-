//
//  InterfaceController.swift
//  AudioAppTest WatchKit Extension
//
//

import WatchKit
import Foundation
import AVFoundation


class InterfaceController: WKInterfaceController, AVAudioRecorderDelegate, AVAudioPlayerDelegate{
    
    
    @IBOutlet weak var recordBtn: WKInterfaceButton!
    var recordSession: AVAudioSession!
    var audioRecorder: AVAudioRecorder!
    var audioPlayer: AVAudioPlayer!
    var settings = [String : Int]()
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        recordSession = AVAudioSession.sharedInstance()
        
        if(recordSession.responds(to:#selector(AVAudioSession.requestRecordPermission(_:)))){
            // configure audio settings
            AVAudioSession.sharedInstance().requestRecordPermission({(granted: Bool) -> Void in
                if granted{
                    print("Recording granted!")
                    
                    do{
                        try self.recordSession.setCategory(.playAndRecord,mode: .default, options: [])
                        try self.recordSession.setActive(true)
                    }catch{
                        print("Audio session could not be set!")
                    }
                }else{
                    print("Recording not granted!")
                }
            })
        }
        
        settings = [AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
                    AVSampleRateKey: 12000,
                    AVNumberOfChannelsKey: 1,
                    AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue
        ]
        
    }
    
    override func willActivate() {
        // This method is called when watch view controller is about to be visible to user
        super.willActivate()
    }
    
    override func didDeactivate() {
        // This method is called when watch view controller is no longer visible
        super.didDeactivate()
    }
    
    func getDocumentsDirectory()-> URL {
        let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
        let documentDirectory = paths[0]
        return documentDirectory
    }
    
    func getAudioURL() -> URL {
        let filename = NSUUID().uuidString+".m4a"
        return getDocumentsDirectory().appendingPathComponent(filename)
    }
    
    func startRecording(){
        
        do{
            audioRecorder = try AVAudioRecorder(url:self.getAudioURL(),settings:settings)
            audioRecorder.delegate = self
            audioRecorder.record(forDuration: 15)
        }catch{
            finishRecording(success: false)
        }
    }
    
    func finishRecording(success: Bool){
        audioRecorder.stop()
        if success{
            print("Recorded successfully!")
        }else{
            audioRecorder = nil
            print("Recording failed!")
        }
        
    }
    
    @IBAction func recordListener() {
        print("Button clicked!")
        if audioRecorder == nil{
            self.startRecording()
        }else{
            self.finishRecording(success: true)
        }
    }
    
    func audioRecorderDidFinishRecording(_ recorder: AVAudioRecorder, successfully flag: Bool) {
        if !flag{
            finishRecording(success:false)
        }
        print(recorder.url)
        
    }
    
    func preparePlayer(){
        do{
            audioPlayer = try AVAudioPlayer(contentsOf: audioRecorder.url)
            audioPlayer.delegate = self
            audioPlayer.prepareToPlay()
            audioPlayer.volume = 5.0
        }catch{
            if let err = error as Error?{
                print("AVAudioPlayer error: \(err.localizedDescription)")
            }
        }
    }
    
    
    @IBAction func playPressed() {
        
        if audioRecorder != nil{
            if !audioRecorder.isRecording{
                preparePlayer()
                audioPlayer.play()
            }
            audioRecorder = nil
        }else{
            print("Empty file!")
        }
        showUrls()
    }
    
    // helper function
    func showUrls(){
        guard let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in:.userDomainMask).first else{ return}
        
        do{
            let contentOfDirectory = try FileManager.default.contentsOfDirectory(at: documentsDirectory, includingPropertiesForKeys: nil, options:[])
            print(contentOfDirectory)
        } catch{
            print("Could not list urls of files in documents directory: \(error)")
        }
    }
}
