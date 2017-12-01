from dronekit import connect, VehicleMode

connected = False
copter = None

connection_string = "udpin:0.0.0.0:14550"

def copterConnect():
    global connected
    global copter
    if (connected):
        copter.close()
        connected = False
        return {"conStatus": connected}
    else:
        copter = connect(connection_string, wait_ready=False)
        connected = True
        print("Attempting to Connect to Copter on " + connection_string)
        return {"conStatus": connected}

def getCoords():
    global copter
    print("request to get coords")
    return {"telem": {"lat": str(copter.location.global_frame.lat), "lon": str(copter.location.global_frame.lon)}}
