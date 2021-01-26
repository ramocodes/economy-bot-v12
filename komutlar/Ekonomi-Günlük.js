const db = require('quick.db');
const ms = require('parse-ms');
const { MessageEmbed } = require('discord.js');
const settings = require("../Settings/economy.json")
exports.run = async (client, message, args) => {
let banka = await db.get(`hesapdurumu_${message.author.id}`)
if (!banka) return message.channel.send(new MessageEmbed().setDescription(`${message.author} Bilgilerini Kaydetmem İçin Bir Banka Hesabı Oluşturmalısın!`))
    
  
        let user = message.author;
        let timeout = 86400000;
        let author = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        var randomcoin = [
            "2000",
            "5000",
            "1589",
            "10000",
            "7500",
            "650",
            "1200",
            "3500",
            "8900",
            "25000"
        ]
           var amount = randomcoin[Math.floor(Math.random() * (randomcoin.length))]

        if(author !== null && timeout - (Date.now() - author) > 0){
            let time = ms(timeout - (Date.now() - author));
            return message.channel.send(new MessageEmbed().setDescription(`Sen zaten günlük ödülünü almışsın **${time.hours}** saat **${time.minutes}** dakika **${time.seconds}** saniye beklemelisin.`))
        } else {
            db.add(`money_${user.id}`, amount)
            db.set(`daily_${user.id}`, Date.now())

            message.channel.send(new MessageEmbed().setDescription(`Günlük ödülünden **${amount}** ${settings.para.parabirimi || "Coin"} kazandın.`))
        }
    }
    exports.conf = {
        enabled: true, 
        guildOnly: true, 
        aliases: ['günlük'],
        permLevel: 0 
      };
      
      exports.help = {
        name: 'daily  '
      };