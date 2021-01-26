const db = require('quick.db');
const ms = require('parse-ms');
const { MessageEmbed } = require('discord.js');
const settings = require("../Settings/economy.json");
const { parseZone } = require('moment');
exports.run = async (client, message, args) => {
let banka = await db.get(`hesapdurumu_${message.author.id}`)
if (!banka) return message.channel.send(new MessageEmbed().setDescription(`${message.author} Bilgilerini Kaydetmem İçin Bir Banka Hesabı Oluşturmalısın!`))
  
let bakiye = await db.get(`money_${message.author.id}`);
if(bakiye < 3000) return message.channel.send(new MessageEmbed().setDescription(`Kazanmak İçin En Az **3000 ${settings.para.parabirimi || "Coin"}** Sahip Olmalısın.`))

if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(`Ortaya Bir **${settings.para.parabirimi || "Coin"}** Koymalısın Yoksa Kazanamayacaksın.`))
if(isNaN(args[0])) return message.channel.send(new MessageEmbed().setDescription(`Lütfen Rakamsal Değer Yazınız.`))
if (args[0] > bakiye) return message.channel.send(new MessageEmbed().setDescription(`Girdiğin Miktar Çok Fazla Bankanda Okadar Para Bulunmuyor`))

const taraf = ["kazan", "kaybet"];
if (taraf[Math.floor(Math.random() * taraf.length)] === "kazan") {
    message.channel.send(`${message.author} Kazanmak İçin **${args[0]} ${settings.para.parabirimi || "Coin"}** Ortaya Koydu Ve Sonuç..`).then(z => {
        setTimeout(function() {
            z.edit(`${message.author} Heyt!, Kazandın Bu Yüzden Bankana **${args[0] * 2} ${settings.para.parabirimi || "Coin"}** Para Yatırdım`)
        }, 3000)
    })
    db.add(`money_${message.author.id}`, +args[0] * 2);
} else {
    message.channel.send(`${message.author} Kazanmak İçin **${args[0]} ${settings.para.parabirimi || "Coin"}** Ortaya Koydu Ve Sonuç..`).then(z => {
        setTimeout(function() {
            z.edit(`${message.author} Maalesef!, Kaybettin Bu Yüzden Bankandan **${args[0]} ${settings.para.parabirimi || "Coin"}** Para Kestim`)
        }, 3000)
    })
    db.add(`money_${message.author.id}`, -args[0]);
}
} 
exports.conf = {
enabled: true, 
guildOnly: true, 
aliases: ['kazan'],
permLevel: 0 
};

exports.help = {
name: 'kazan'
};