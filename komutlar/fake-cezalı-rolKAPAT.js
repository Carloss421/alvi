const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
.setImage('https://cdn.glitch.com/0c8ef551-5187-48a8-9daf-f2cc35630f21%2Fyoneticigif.gif')
.setTitle('Bir hata oldu!')
.setDescription(`• \`${prefix}fake-cezalı-rol-kapat\` **kullanmak için,** \`Yönetici\` **yetkisine sahip olman gerekiyor.**`));
data.delete(`fake.role.${message.guild.id}`)
message.channel.send(new Discord.MessageEmbed()
.setTitle('İşte bu kadar!') 
.setDescription('Fake cezalı da kullanılan rol kapatıldı.'));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'fake-cezalı-rol-kapat'
};