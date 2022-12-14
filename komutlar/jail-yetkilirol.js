const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png').setImage('https://cdn.glitch.com/0c8ef551-5187-48a8-9daf-f2cc35630f21%2Fyoneticigif.gif').setTitle('Bir hata oldu!').setDescription(`• \`${prefix}jail-yetkili-rol\` **kullanmak için,** \`Yönetici\` **yetkisine sahip olman gerekiyor.**`));
  if(!message.mentions.roles.first()) return message.channel.send(new Discord.MessageEmbed().setColor('#00001').setTitle('Bir hata oldu!').setDescription('Bir rol etiketlemeyi unuttunuz.'));
  let mentionRole = message.mentions.roles.first();
  data.set(`jail.yetkilirole.${message.guild.id}`, mentionRole.id);
  message.channel.send(new Discord.MessageEmbed().setTitle('İşte bu kadar!').setDescription(`Jail sistemin de kullanılacak: ${mentionRole} olarak seçtiniz.`));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'jail-yetkili-rol'
};