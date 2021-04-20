const Discord = require('discord.js');
const data = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
const prefix = ayarlar.prefix;
const ad = await data.fetch(`numara.${message.channel.id}`)
if(message.channel.name === `ticket-${ad}` || message.channel.name === `kapandı-${ad}`) {
const ann = await data.fetch(`asd.${message.guild.id}.${message.channel.id}.${message.author.id}`)
if(!ann) return message.channel.send(`Bu bilet senin değil.`)
message.delete()

message.channel.send(new Discord.MessageEmbed()
.setColor('#ffff00')
.setDescription(`Ticket ${message.author} tarafından açıldı.`))
message.channel.setName(`ticket-${ad}`)

} else { return message.channel.send(`Bu komutu bir bilet kanalında kullanın.`) }

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'aç'
};