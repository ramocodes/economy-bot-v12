const db = require('quick.db');
const ms = require('parse-ms');
const { MessageEmbed } = require('discord.js');
const settings = require("../Settings/economy.json")
exports.run = async (client, message, args) => {
let banka = await db.get(`hesapdurumu_${message.author.id}`)
if (!banka) return message.channel.send(new MessageEmbed().setDescription(`${message.author} Bilgilerini Kaydetmem İçin Bir Banka Hesabı Oluşturmalısın!`))
  

        let user = message.author;
        let timeout = 600000;
        let author = await db.fetch(`worked_${message.guild.id}_${user.id}`);

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

           var randommeselke = [
            "A101'de işçi",
            "İnşaatçı",
            "Mühendis",
            "Pilot",
            "Doktor",
            "Hakim",
            "Öğretmen",
            "Şöför",
            "Güvenlik",
            "Polis"
        ]
           var meslek = randommeselke[Math.floor(Math.random() * (randommeselke.length))]

        if(author !== null && timeout - (Date.now() - author) > 0){
            let time = ms(timeout - (Date.now() - author));
            return message.channel.send(new MessageEmbed().setDescription(`Sen zaten çalışıp yorulmuşsun **${time.minutes}** dakika **${time.seconds}** saniye beklemelisin.`))
        } else {
            db.add(`money_${user.id}`, amount)
            db.set(`worked_${user.id}`, Date.now())
            message.channel.send(new MessageEmbed().setDescription(`${meslek} Olarak çalıştın ve **${amount}** ${settings.para.parabirimi || "Coin"} Kazandın.`))
        }
    }
    exports.conf = {
        enabled: true, 
        guildOnly: true, 
        aliases: ['çalış'],
        permLevel: 0 
      };
      
      exports.help = {
        name: 'çalış  '
      };