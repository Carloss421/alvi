const Discord = require("discord.js");
const superagent = require("superagent");

exports.run = async (client,message,args) => {
  var rol = message.content.split(" ").slice(1).join(" ");
  let role = message.guild.roles.cache.find("name", `${rol}`)
  var hata = new Discord.MessageEmbed()
  .setColor("#36393F")
  .setDescription("❌ Lütfen Bir Rol İsmi Yazın `Örnek: a!rolbilgi @Kullanıcı` **Not: Kendinizden Yüksek Rollere Bakamassınız** ");
  if(!role) return message.channel.send(hata);
  var moment = require("moment");
  var temps = moment(message.createdTimestamp).format("LLLL");
  var roleinfoEmbed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .addField('✏ Rol İsmi', role.name, true)
  .addField('🆔 ID', role.id, true)
  .addField('👥 Role Sahip Kullanıcılar', role.members.cache.size, true)
  .addField('💙 Renk', role.hexColor, true)
  .addField('📣 Etiketleme?', role.mentionable ? '\nEvet' : 'Hayır', true)
  .addField('📅 Oluşturulduğu Zaman', moment(role.createdAt).format("LL"), true)
  message.channel.send(roleinfoEmbed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rolinfo', 'rolhakkında', 'rolbilgi','rol-bilgi'],
  permLevel: 0
};

exports.help = {
  name: 'rolinfo',
  description: 'rolinfo | Rol hakkında bilgi verir.',
  usage: 'rolinfo <rolismi>'
};