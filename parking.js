//#region : Sample
// create_parking_lot 6
// park KA-01-HH-1234
// park KA-01-HH-9999
// park KA-01-BB-0001
// park KA-01-HH-7777
// park KA-01-HH-2701
// park KA-01-HH-3141
// leave KA-01-HH-3141 4
// status
// park KA-01-P-333
// park DL-12-AA-9999
// leave KA-01-HH-1234 4
// leave KA-01-BB-0001 6
// leave DL-12-AA-9999 2
// park KA-09-HH-0987
// park CA-09-IO-1111
// park KA-09-HH-0123
// status
//#endregion

const fs=require('fs');

let slotStatus=[];

function createParking({slots=0}){
    slotStatus=Array(slots).fill(null);
    console.log(`Created parking lot with ${slots} slots`);
}

function park({numberPlate=null}){
    //console.log("Number Plate : ",numberPlate);
    if(numberPlate){
        const index=slotStatus.indexOf(null);
        if(index>=0){
            slotStatus[index]=numberPlate;
            console.log(`Allocated slot number : ${index+1}`);
        }else{
            console.log("Sorry, parking lot is full");
        }
    }
}

function leave({numberPlate=null, numberOfHours=0}){
    //console.log("Number Plate , Number of Hours : ",numberPlate,numberOfHours);
    const index=slotStatus.indexOf(numberPlate+'\r');
    if(index==-1){
        console.log(`Registration number ${numberPlate} not found`);
        return;
    }
    let charge=0;
    if(numberOfHours<=2){
        charge=10;
    }else{
        charge=10+10*(numberOfHours-2);
    }
    console.log(`Registration number ${numberPlate} with Slot Number ${index+1} is free with Charge ${charge}`);
    slotStatus[index]=null;
}

function status(){
    console.log("Slot No. Registration No.");
    slotStatus.forEach((slot,index) => {
        console.log(index+1, slot );
    });
}

function readData(){
    fs.readFile("sampleData.txt",'utf-8',(err,data)=>{
        if(err){console.log(err); return err;}
        else{
            //console.log(data);
            const lines=data.split('\n');
            lines.forEach(line => {
                const command=line.split(" ");
                if(command[0]=="create_parking_lot"){
                    createParking({slots:+command[1]});
                }else if(command[0]=="park"){
                    park({numberPlate:command[1]})
                }else if(command[0]=="leave"){
                    leave({numberPlate:command[1], numberOfHours:+command[2]})
                }else if(command[0]=="status"){
                    status();
                }
            });
            //return data;
        }
    });
}

readData();
console.log(slotStatus);