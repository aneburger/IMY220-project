#include <iostream>

using namespace std;


class Fan {
public:
    void startRotate() { cout << "Fan is rotating" << endl;}
    void stopRotate() { cout << "Fan is not rotating" << endl;}
};

class Light {
public:
    void turnOn( ) { cout << "Light is on " << endl; }
    void turnOff( ) { cout << "Light is off" << endl; }
};

class Command {
public:
    virtual void execute ( ) = 0;
};

class LightOnCommand : public Command {
public:
    LightOnCommand (Light* L) { myLight  =  L;}
    void execute( ) { myLight -> turnOn( ); }
private:
    Light* myLight;
};

class LightOffCommand : public Command {
public:
    LightOffCommand (Light* L) { myLight  =  L;}
    void execute( ) { myLight -> turnOff( ); }
private:
    Light* myLight;
};

class FanOnCommand : public Command {
public:
    FanOnCommand (Fan* f) { myFan  =  f;}
    void execute( ) { myFan -> startRotate( );}
private:
    Fan* myFan;
};

class FanOffCommand : public Command {
public:
    FanOffCommand (Fan* f) { myFan  =  f;}
    void execute( ) {myFan -> stopRotate( );}
private:
    Fan* myFan;
};


class Switch {
public:
    Switch(Command* up, Command* down)
    {
        upCommand = up;
        downCommand = down;
    }
    
    void flipUp( ) { upCommand -> execute( );};
    void flipDown( ) {downCommand -> execute ( );};
    
private:
    Command* upCommand;
    Command* downCommand;
};

int main() {
    Light*  testLight = new Light( );
    Fan* testFan = new Fan();
    
    LightOnCommand* testLiOnCmnd = new LightOnCommand(testLight);
    LightOffCommand* testLiOffCmnd = new LightOffCommand(testLight);
    FanOnCommand* testFaOnCmnd = new FanOnCommand(testFan);
    FanOffCommand* testFaOffCmnd = new FanOffCommand(testFan);
    
    Switch* lightSwitch = new Switch(testLiOnCmnd,testLiOffCmnd);
    Switch* fanSwitch = new Switch(testFaOnCmnd,testFaOffCmnd);
    
    lightSwitch -> flipUp();
    lightSwitch -> flipDown();
    fanSwitch -> flipUp();
    fanSwitch -> flipDown();
    
    /** As opposed to
     testLight -> turnOn();
     testLight -> turnOff();
     testFan -> startRotate();
     testFan -> stopRotate();
     */
    
    return 0;
}
