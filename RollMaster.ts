const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('logged in as ' + client.user.tag);    
})

client.on('message', (msg) => {
    manageMessage(msg);
})

client.login('NTA1MjgwNTYxOTkzMDg5MDI1.DrRTLA.ih84J-EUjd4PjlbiAMcs7URweLg');

function manageMessage (msg) {
    if (msg.content[0] === '/') {
        const value = msg.content.split(' ');        
        switch (value[0]) {
            case '/r':
                if (value[1]){
                    if (value[2] && value[3])
                        msg.reply(roll(value[1], value[2], value[3]));
                    else
                        msg.reply(roll(value[1]));
                } else {
                    msg.reply(rollSynthax);
                }
                break;
        }
    }
}

function roll(rollConsign, condition = null, target = null) {
    let roll = 0;
    let total = 0;
    let results = new Array();
    let explosive = false;
    let success = 0;
    let range = 0;

    const value = rollConsign.split('d');
    if (value.length != 2)
        return rollSynthax;
    else {
        value[0] = parseInt(value[0]);

        if (value[1].indexOf('!') > -1) {
            explosive = true;
            let exp = value[1].split('!');
            value[1] = parseInt(exp[0]);
            if (exp[1])
                range = parseInt(exp[1]);
        } else 
            value[1] = parseInt(value[1]);

        for (let i = 0; i < value[0] && roll < 200; i++, roll++) {
            let res = getRandomInt(value[1]) + 1;
            results.push(res);
            total += res;
            if (explosive && res >= value[1] - range)
                i--;
        }
        let valret = "**" + total.toString() + "**" + " (";
        results.forEach((e, i) => {
            if (condition != null && target != null) {
                switch (condition) {
                    case '<=':
                        if (e <= parseInt(target)){
                            e = "**" + e.toString() + "**";
                            success++;
                        }
                        else {
                            e = "~~" + e.toString() + "~~";
                            success--;
                        }
                        break;
                    case '>=':
                            if (e >= parseInt(target)){
                                e = "**" + e.toString() + "**";
                                success++;
                            }
                            else {
                                e = "~~" + e.toString() + "~~";
                                success--;
                            }
                        break;
                    case '<':
                            if (e < parseInt(target)){
                                e = "**" + e.toString() + "**";
                                success++;
                            }
                            else {
                                e = "~~" + e.toString() + "~~";
                                success--;
                            }
                        break;
                    case '>':
                            if (e > parseInt(target)){
                                e = "**" + e.toString() + "**";
                                success++;
                            }
                            else {
                                e = "~~" + e.toString() + "~~";
                                success--;
                            }
                        break;
                    case '!=':
                            if (e != parseInt(target)){
                                e = "**" + e.toString() + "**";
                                success++;
                            }
                            else {
                                e = "~~" + e.toString() + "~~";
                                success--;
                            }
                        break;
                    case '==':
                            if (e == parseInt(target)){
                                e = "**" + e.toString() + "**";
                                success++;
                            }
                            else {
                                e = "~~" + e.toString() + "~~";
                                success--;
                            }
                        break;
                }
            }

            valret += e.toString();
            if (i < results.length -1 )
                valret += ", ";
            else
                valret += ")";
        })

        if (condition != null && target != null) {
            return valret + " : " + success + " success";
        } else
            return valret;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const rollSynthax = `Please respect this format :
/r (nb dice)d(dice value)
if explosiv /r 1d10!
for succes count /r 1d10 (condition)
example :
/r 1d10! > 5
/r 1d100 <= 10`;

const conditionRules = ` > for superior
< for inferior
>= for superior or egal
<= for inferior or egal
== for egal
!= for different`;