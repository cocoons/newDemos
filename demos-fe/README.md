# demos-fe
```
#### manual installation
```
#### # cd demos-fe  

#### # npm install --global expo-cli  

#### # npm install  

#### # expo start  

#### # press "w"  
  
 <br> 

```
### to see: install a virtual mobile device can be done with android studio.  
```
#### # Install android studio

#### # Open AVD manager  

#### # create a device  

#### # run the device  

#### # and open a browser on the device and type in whatever ip expo said e.g 0.0.0.0:19006  

<br>

```
#### Or as a container Dockerfile (will only work if demos-be is up and can be accessed and postgres container is up for demos-be. Use "demos-be/docker-compose up" for containerized with network bridge for all 3 containers)
```
#### # cd < clone-dir >  

#### # docker build -t demos-fe .  

#### # docker run -p 19001:19001 -p 19002:19002 -p 19006:19006 --name demos-fe demos-fe  

