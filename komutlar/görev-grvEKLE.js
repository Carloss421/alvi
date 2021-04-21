const Discord = require("discord.js");
const db = require('quick.db')
const ayarlar = require("../ayarlar.json")
module.exports.run = async (client, message, args) => {
  if(message.author.id !== ayarlar.ownerID)  {
    const embed = new Discord.MessageEmbed()
    .setDescription(`**:warning: Bu komut bakımda!\nSebep: Ayarlanıyor**`)
    .setColor('BLUE')
    return message.channel.send(embed).then(msg=>msg.delete(3000));
    }
  
  const embedD = new Discord.MessageEmbed()
  let görevADD = await db.fetch(`görevEKLE_${user.id}`)
  let görevNUMBER = await db.fetch(`görevNUMBER_${user.id}`)
  .setTitle("Alvi - Görev Ekle")
  .setColor("RED")
  .setDescription(`${user.id} bu kullanıcının görev eklenme sınırına ulaşıldı! (5/5)`)
  
  let user = message.mentions.users.first()
let görev1 = db.add(`görevEKLE_${user.id}`, 1)
let görev2 = db.add(`görevEKLE_${user.id}`, 2)
let görev3 = db.add(`görevEKLE_${user.id}`, 3)
let görev4 = db.add(`görevEKLE_${user.id}`, 4)
let görev5 = db.add(`görevEKLE_${user.id}`, 5)
  if(message.author.id !== ayarlar.botsahibi) return message.react("❌")
  if(!user) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`Görev eklenicek kullanıcıyı etiketle!`))

  if(!args[1]) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`⛔ Görev adını girmelisin!`)) 

  if(isNaN(args[1])) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`⛔ Görev açıklmasını girmelisin`)) 

  if(args[1] < 0) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`🤔 Göre Eklenemedi Galiba Hata Yaptın!`));    

  

message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`✅ ${user} kullanıcısına ${görev1} görev eklendi!\nKullanıcı'nın Toplam Görev Sayısı: \`${görevNUMBER}\``))
  
message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`✅ ${user} kullanıcısına ${görev2} görev eklendi!\nKullanıcı'nın Toplam Görev Sayısı: \`${görevNUMBER}\``))

message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`✅ ${user} kullanıcısına ${görev3} görev eklendi!\nKullanıcı'nın Toplam Görev Sayısı: \`${görevNUMBER}\``))

message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`✅ ${user} kullanıcısına ${görev4} görev eklendi!\nKullanıcı'nın Toplam Görev Sayısı: \`${görevNUMBER}\``))

message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`✅ ${user} kullanıcısına ${görev5} görev eklendi!\nKullanıcı'nın Toplam Görev Sayısı: \`${görevNUMBER}\``))


}
  
exports.conf = {
  enabled: true,
  aliases: ["görev-ekle"],
};

exports.help = {
  name: 'görevle',
};