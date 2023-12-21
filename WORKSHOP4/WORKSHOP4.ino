#include "config.h"

#define TEMP A3
#define LIGHT A2

float lightValue, tempValue;

//IO FEEDZ

AdafruitIO_Feed *tempfeed = io.feed("tempfeed");
AdafruitIO_Feed *lightfeed = io.feed("lightfeed");

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  io.connect();
  pinMode(TEMP, INPUT);
  pinMode(LIGHT, INPUT);

  while(io.status() < AIO_CONNECTED){
    Serial.print (".");
    delay(500);
  }
  
}

void loop() {

  io.run();
  readLight();
  readTemp();
  delay(4000);

}

void readLight(){
  lightValue = analogRead(LIGHT);
  Serial.print('Light value: ');
  Serial.println(lightValue);
  lightfeed->save(lightValue);

}

void readTemp(){
  tempValue = analogRead(TEMP);
  Serial.print('Temp value: ');
  Serial.println(tempValue);
  tempfeed->save(tempValue);
}
