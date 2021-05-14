const Discord = require('discord.js');
const data = require('quick.db')
let ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args) => {
  ////--------------------------------------------\\\\       
  let prefix = ayarlar.prefix
  let sahip = ('739411430171738142','720236094792400987') //Premium verebilicek / alabilecek kişiler
  let log = client.channels.cache.get('833215025262362625') // logların tutulcağı kanal
  ////--------------------------------------------\\\\     
if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`Premium sisteminden yararlanmak için bot sahibinin sizin premiumunuzu aktif etmiş olması gerekiyor.
\`${prefix}premium\` \`kontrol\``))
////----------------------\\\\ PREMİUM KONTROL ////----------------------\\\\   
if(message.author.id !== sahip) {
  if(args[0] === 'kontrol') {
  let açıkmı = await data.fetch(`premium.${message.guild.id}`)  
  message.channel.send(new Discord.MessageEmbed()  
.setColor('RANDOM')
.setAuthor(message.guild.name, message.guild.iconURL)
.setDescription(`Bu sunucu için **Premium** sistemi **${açıkmı ? 'aktif' : 'kapalı'}**!`)
.setTimestamp())   
}}
////----------------------\\\\ PREMİUM VER ////----------------------\\\\   
  if(args[0] === 'ver') {
  if(message.author.id !== sahip) return;
  ////----------------------\\\\ ID Boş ise ////----------------------\\\\   
  if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Lütfen Bir Kullanınıcın ID'sini Gir.** \n**Örnek Kullanım: a!premium ver 847239847204982234**`).setTimestamp().setTitle(`❌ Hata !`).setColor(`RED`))
  let id = args[1]
  if(isNaN(id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Sadece sayı girebilirsin.**`).setTimestamp().setTitle(`❌ Hata !`).setColor(`RED`))
  ////----------------------\\\\ ID Kısa İse ////----------------------\\\\   
  if(id < 15) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Girdiğin Rakam Bir Kullanınıcın ID'si Olmak İçin Çok Küçük.**`).setTimestamp().setTitle(`❌ Hata !`).setColor(`RED`))
  ////----------------------\\\\ ID bulunamaz ise ////----------------------\\\\   
  if(!client.guilds.cache.get(id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`\`${id}\` **kullanıcıyı bulamıyorum.**`).setTimestamp().setTitle(`❌ Hata !`).setColor(`RED`))
  let açıkmı = await data.fetch(`premium.${id}`)
  if(açıkmı) return message.channel.send(new Discord.MessageEmbed().setDescription(`\`${id}\` **kullanıcı için zaten premium aktif.**`).setTimestamp().setTitle(`❌ Hata !`).setColor(`RED`))
  ////----------------------\\\\ veritabanı ////----------------------\\\\     
  data.set(`premium.${id}`, 'açık')
  message.channel.send(new Discord.MessageEmbed().setDescription(`<@${owner.user.id}> isimli kullanıcı için **PREMİUM** aktif edildi!`).setTimestamp().setTitle(`✅ Başarılı !`).setColor(`GREEN`))
 
 ////----------------------\\\\ Sunucu sahibi mesaj ////----------------------\\\\
  
  let owner = client.guilds.cache.get(id).owner;
  owner.send(new Discord.MessageEmbed().setDescription(`
  **Merhaba** \`${owner.user.username}\` \`${message.author.tag}\` **bot sahibi** senin için premium'unu açtı.**`).setTimestamp().setTitle(`🔔 Bilgilendirme !`).setColor(`YELLOW`))
   ////----------------------\\\\ Log kanal mesaj ////----------------------\\\\    
    log.send(new Discord.MessageEmbed().setDescription(`
\`${message.author.tag}\` **İsimli bot sahibi** \n \`${owner.user.username}\` adlı kullanıcı için premium'unu açtı.**`).setTimestamp().setTitle(`🔔 Bilgilendirme !`).setColor(`YELLOW`)) 
  }
  ////----------------------\\\\ PREMİUM AL ////----------------------\\\\   
  if(args[0] === 'al') {
  if(message.author.id !== sahip) return;
 /*
 ////--------------------------\\\\ Süre ayarlanmamış ise ////----------------------\\\\   
  if(args[2]) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir Süre belirtmedin.
**y**yıl **m**ay **w**hafta **h**saat **m**dakika **s**saniyee`)).setTimestamp().setTitle(`❌ Hata !`).setColor(`RED`)
      let süre = args[2]
  if(isNaN(süre)) return message.channel.send(new Discord.MessageEmbed().setDescription(`Süre girmelisin!`).setTitle(`❌ Hata !`).setColor(`RED`));
*/
     ////----------------------\\\\ ID Boş ise ////----------------------\\\\    
  if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir kullanıcının ID'sini girmeyi dene.`).setTimestamp().setTitle(`❌ Hata !`).setColor(`RED`))
  let id = args[1]
  if(isNaN(id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sadece sayı girebilirsin.`).setTimestamp().setTitle(`❌ Hata !`).setColor(`RED`))
    ////----------------------\\\\ ID Kısa İse ////----------------------\\\\   
  if(id < 15) return message.channel.send(new Discord.MessageEmbed().setDescription(`Girdiğin rakam bir kullanıcı ID'si olmak için çok küçük.`).setTimestamp().setTitle(`❌ Hata !`).setColor(`RED`))
   ////----------------------\\\\ ID bulunamaz ise ////----------------------\\\\   
 if(!client.guilds.cache.get(id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**${id}** kullanıcısını bulamıyorum.`).setTimestamp().setTitle(`❌ Hata !`).setColor(`RED`))
  let açıkmı = await data.fetch(`premium.${id}`)
  if(!açıkmı) return message.channel.send(new Discord.MessageEmbed().setDescription(`**${id}** kullanıcı için zaten premium aktif değil.`).setTimestamp().setTitle(`❌ Hata !`).setColor(`RED`))
    ////----------------------\\\\ veritabanı ////----------------------\\\\     
  data.delete(`premiumUYE.${id}`)
  message.channel.send(new Discord.MessageEmbed().setDescription(`<@${owner.user.id}> adlı üye için **PREMİUM** aktif edildi!`).setTimestamp().setTitle(`✅ Başarılı !`).setColor(`GREEN`))
    ////----------------------\\\\ Sunucu sahibi mesaj ////----------------------\\\\      
  let owner = client.guilds.cache.get(id).owner;
  owner.send(new Discord.MessageEmbed().setDescription(`
**Merhaba** <@${owner.user.id}>**!** \`${message.author.tag}\` **isimli bot sahibi** **senin premium'unu kapattı.**`).setTimestamp().setTitle(`🔔 Bilgilendirme !`).setColor(`YELLOW`))
     ////----------------------\\\\ Log kanal mesaj ////----------------------\\\\      
    log.send(new Discord.MessageEmbed().setDescription(`
\`${message.author.tag}\` **isimli bot sahibi** \n \`${owner.user.username}\` **Adlı kullanıcının premium'unu kapattı.**`).setTimestamp().setTitle(`🔔 Bilgilendirme !`).setColor(`YELLOW`))
  }    
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['üyepre',"preüye"],
  permLevel: 0
}  
exports.help = {
  name: 'üye-premium'
};