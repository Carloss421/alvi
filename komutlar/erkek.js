const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
 if (!message.member.roles.has('704679594120183930') && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("Black"));
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bir üye etiketlemelisin!').setColor("Black"));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
   let isim = args[1];
      if(!isim) return message.channel.send("Lütfen bir isim girin!").then(m => m.delete(5000));
   let yas = args[2];
      if(!yas) return message.channel.send("Lütfen bir yaş girin!")
await member.setNickname(` ${isim} | ${yas}`);
  member.addRole("704679594879483915"); //erkek rol id
  member.removeRole("704679697623154769"); //kayıtsız rol id
  message.react('704681763477127219') //Emojiid
     const kanal = message.guild.channels.find(c => c.id == "704679559290814544") //LOGİD
    const embed1 = new Discord.RichEmbed() 
    .addField(`Kob's`, `<a:white_check_mark:704682052133584917>  ${member.user} **Hoşgeldin , Seninle Beraber** \`${member.guild.memberCount}\` **Üyeye Ulaştık.**`)
    .setColor("RED")
    .setFooter(message.author.tag ,message.author.avatarURL)
    .setTimestamp()
  let embed = new Discord.RichEmbed() 
  .setColor("PİNK")
  .addField(`Kob's`, `<a:white_check_mark:704682052133584917> ${member.user} **adlı üyeye** <@&704679594879483915> **rolünü verip ismini**  \` ${isim} | ${yas}\` **olarak ayarladım!**`)                                                                             
  .setFooter(message.author.tag ,message.author.avatarURL)
  .setTimestamp()
  return message.channel.send(embed).then(kanal.send(embed1))
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["erkek" , "e"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}
exports.help = {
  name: 'Erkek',
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: 'Erkek isim yaş'
} 