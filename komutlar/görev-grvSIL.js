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
  let görevDELETE = await db.fetch(`görevSIL_${user.id}`)
  let görevNUMBER = await db.fetch(`görevNUMBER_${user.id}`)
  .setTitle("Alvi - Görev Ekle")
  .setColor("RED")
  .setDescription(`${user.id} bu kullanıcının görev eklenme sınırına ulaşıldı! (5/5)`)

  

let user = message.mentions.users.first()
let görev1 = db.delete(`görevSIL_${user.id}`, 1)
let görev2 = db.delete(`görevSIL_${user.id}`, 2)
let görev3 = db.delete(`görevSIL_${user.id}`, 3)
let görev4 = db.delete(`görevSIL_${user.id}`, 4)
let görev5 = db.delete(`görevSIL_${user.id}`, 5)
  if(message.author.id !== ayarlar.botsahibi) return message.react("❌")
  if(!user) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`Görevi silinicek kullanıcıyı etiketle!`))

  if(args[1] < 0) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`🤔 Göre Silinemedi, Galiba Hata Yaptın!`));    

  

message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`✅ ${user} adlı kullanıcının görevi silindi!\nSilinen Görev Sayısı: \`${görev1}\`\nKullanıcı'nın Kalan Görev Sayısı: \`${görevNUMBER}\``))
  
message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`✅ ${user} adlı kullanıcının görevi silindi!\nSilinen Görev Sayısı: \`${görev2}\`\nKullanıcı'nın Kalan Görev Sayısı: \`${görevNUMBER}\``))

message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`✅ ${user} adlı kullanıcının görevi silindi!\nSilinen Görev Sayısı: \`${görev3}\`\nKullanıcı'nın Kalan Görev Sayısı: \`${görevNUMBER}\``))

message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`✅ ${user} adlı kullanıcının görevi silindi!\nSilinen Görev Sayısı: \`${görev4}\`\nKullanıcı'nın Kalan Görev Sayısı: \`${görevNUMBER}\``))

message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`✅ ${user} adlı kullanıcının görevi silindi!\nSilinen Görev Sayısı: \`${görev5}\`\nKullanıcı'nın Kalan Görev Sayısı: \`${görevNUMBER}\``))


}
  
exports.conf = {
  enabled: true,
  aliases: ["görev-sil"],
};

exports.help = {
  name: 'görevsille',
};