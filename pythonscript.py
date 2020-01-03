from tkinter import Tk, Button, Frame, Canvas, NW
from PIL import Image, ImageTk
import cv2
import os
video_name = "/home/rick/Vídeos/video1.webm" #This is your video file path

class App:
    def __init__(self, window):
        self.window = window
        # window.attributes('-zoomed', True)
        window.overrideredirect(True)
        window.lower()
        self.width = 450
        self.height = 450
        
        self.video = CaptureVideo(video_name, self.width, self.height)
        
        self.canvas = Canvas(window, width = self.width, height = self.height)
        self.canvas.pack(fill='both')

        window.geometry("{0}x{1}".format(self.width,self.height))        
            
        self.delay = 15
        self.update()
        self.window.mainloop()
    
    def update(self):
        ret, frame = self.video.get_frame()
        
        if ret:
            self.photo = ImageTk.PhotoImage(image = Image.fromarray(frame))
            self.canvas.create_image(0, 0, image = self.photo, anchor = NW)

        self.window.after(self.delay, self.update)

    def close_app(self):        
            self.window.destroy()
    def keyPressed(self, key):
        if (key.char == 'e'):
            print ('press', key.char)
            self.close_app()
        return 'break'

class CaptureVideo:
    def __init__(self, video_src="", width="1280", height="720"):
        self.video = cv2.VideoCapture(video_src)
        self.width = width
        self.height = height
        self.video.set(3, width)
        self.video.set(4, height)

    def get_frame(self):
        if self.video.isOpened:
            ret, frame = self.video.read()
            if ret:
                currentFrame = cv2.resize(frame, (self.width, self.height))
                currentFrame = cv2.cvtColor(currentFrame, cv2.COLOR_BGR2RGB)
                return (ret, currentFrame)
            else:
                return (ret, None)
        else:
            return (ret, None)
    
    def __del__(self):
        if self.video.isOpened():
            self.video.release()
root = Tk()
App(root)