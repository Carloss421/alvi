const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setDescription(`<:hayir0:838855037161570375> Bu komutu kullanabilmek için \`yönetici\` yetkisine sahip olmalısın`).setColor("RED"));

if(args[0] === "sıfırla") {
const sıfırlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`${client.user.username} - Kayıtçı Rol Sıfırla `)
.setColor('BLACK')
.setDescription(`<:evet1:838854924875726898> Sunucu İçin Ayarladığınız Kayıtçı Rol Başarıyla Sıfırlandı!`)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı!`)
message.channel.send(sıfırlandı)
db.delete(`kkayıtçırol_${message.guild.id}`)
return;
}

let rol = message.mentions.roles.first();   
if (!rol) {
  const ayarlanmadı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`${client.user.username} - Kayıtçı Rol Ayarla `)
.setColor('BLACK')
.setDescription(`<:hayir0:838855037161570375>  Ayarlayacağınız Kayıtçı Rolü Belirtiniz!`)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı!`)
message.channel.send(ayarlanmadı)
}
db.set(`kkayıtçırol_${message.guild.id}`, rol.id)
const ayarlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`${client.user.username} - Kayıtçı Rol Ayarlandı `)
.setColor('BLACK')
.setDescription(`<:evet1:838854924875726898> Kayıt Edecek Rol Başarıyla ${rol} Olarak Ayarlandı!`)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı!`)
message.channel.send(ayarlandı)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['kayıtçırol', 'kayıtçı'],
  permlevel: 0
}
exports.help = {
  name: 'kayıt-yetkili',
  description: 'kız rolünü ayarlar',
  usage: '!kız-rol @rol'
}