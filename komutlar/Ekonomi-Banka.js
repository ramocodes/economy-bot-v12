const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const settings = require("../Settings/economy.json")
const ayarlar = require("../ayarlar.json")
exports.run = async (client, message, args) => {
let seçim = args[0]
if(!seçim) return message.channel.send(new MessageEmbed().setDescription(`Yanlış Argüman Doğru Kullanım: **\n${ayarlar.prefix}banka hesap oluştur /hesap ismi/\n${ayarlar.prefix}banka hesap bilgi\n${ayarlar.prefix}banka hesap kapat**`))
if(args[0] === 'hesap') {
if(args[1] === 'oluştur') {
const hesapbilgi = await db.fetch(`hesapdurumu_${message.author.id}`);
if(hesapbilgi) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Senin Bir hesabın Bulunuyor Bilgilerine Bakmak İçin: **${ayarlar.prefix}banka hesap bilgi**`))

let hesap = args.slice(2).join(' ');
if(!hesap) return message.channel.send(new MessageEmbed().setDescription(`${message.author} Hesabını Oluşturmam İçin Hesap İsmi Girmen Gerekiyor.`))
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
 const yıl = new Date().getFullYear();
 const ay = new Date().getMonth() || "1"
 const gün = new Date().getDate();

 db.set(`hesapisim_${message.author.id}`, hesap)
 db.set(`hesapdurumu_${message.author.id}`, "aktif");
 db.set(`hesapyıl_${message.author.id}`, yıl)
 db.set(`hesapay_${message.author.id}`, ay)
 db.set(`hesapgün_${message.author.id}`, gün)
 db.add(`money_${message.author.id}`, amount)

message.channel.send(new MessageEmbed().setDescription(`Başarılı, Hesabını Başarıyla Oluşturdum Hesabını Oluşturman Şerefine **${amount} ${settings.para.parabirimi || "Coin"}** Hesabına Yatırdım.`))
}}

if(args[0] === 'hesap') {
if(args[1] === 'bilgi') {
  let kullanıcı = message.mentions.users.first() || message.author;

  let bakiye = await db.fetch(`money_${kullanıcı.id}`);
  let durum = await db.fetch(`hesapdurumu_${kullanıcı.id}`)
  let hesapname = await db.fetch(`hesapisim_${kullanıcı.id}`)
  let hesapyıl = await db.fetch(`hesapyıl_${kullanıcı.id}`)
  let hesapay = await db.fetch(`hesapay_${kullanıcı.id}`)
  let hesapgün = await db.fetch(`hesapgün_${kullanıcı.id}`)

if(!durum) {
if(args[2]) return message.channel.send(new MessageEmbed().setDescription(`${kullanıcı} Kullanıcısının Banka Hesabı Bulunmamaktadır.`))
message.channel.send(new MessageEmbed().setDescription(`Öncelikle Kendine Bir Banka Hesabı Oluşturmalısın: **${ayarlar.prefix}banka hesap oluştur /hesap ismi/`))
} else {

if(!durum) {
if(!hesapname) {
message.channel.send(new MessageEmbed().setDescription(`Hesap İsmi: ${hesapname || "Bulunamadı."}\n Hesap Bakiyesi: **${bakiye ||0} ${settings.para.parabirimi || "Coin"}**\n Hesap Oluşturma Tarihi: Bilinmiyor`))
}
} else {
if(durum) {
if(hesapname) {
message.channel.send(new MessageEmbed().setDescription(`Hesap İsmi: **${hesapname}**\nHesap Bakiyesi: **${bakiye} ${settings.para.parabirimi || "Coin"}**\n Hesap Oluşturma Tarihi: **${hesapay}/${hesapgün}/${hesapyıl}** Tarihinde Oluşturulmuştur.`))
}}}}}}


if(args[0] === 'hesap') {
if(args[1] === 'kapat') {
  let kullanıcı = message.author;
  let durum = await db.delete(`hesapdurumu_${kullanıcı.id}`)
  let hesapname = await db.delete(`hesapisim_${kullanıcı.id}`)
  let hesapyıl = await db.delete(`hesapyıl_${kullanıcı.id}`)
  let hesapay = await db.delete(`hesapay_${kullanıcı.id}`)
  let hesapgün = await db.delete(`hesapgün_${kullanıcı.id}`)
  message.channel.send(new MessageEmbed().setDescription(`${message.author} Banka Hesabın Kapatıldı Bilgilerin Silindi.`))
}}

}
exports.conf = {
    enabled: true, 
    guildOnly: true, 
    aliases: ['banka'],
    permLevel: 0 
  };
  
  exports.help = {
    name: 'banka'
  };