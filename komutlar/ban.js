const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {
  
   if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed().setDescription(`Gerekli izin yok`).setColor("RANDOM"));
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
   /* let modlog = message.guild.channels.find('name', 'cezalog');
    if (!modlog) return message.reply('`cezalog` kanalını bulamıyorum. Ayarlamak için `a!cezalog #cezalog`');
 */
  if (message.mentions.users.size < 1) return message.reply('Banlamak İstediğiniz Kişiyi Etiketleyiniz');
  if (reason.length < 1) return message.reply('Sebeb belirtin');
  if (user.id === message.author.id) return message.reply('Kendini Banlayamazssın');


  

  message.guild.ban(user, 2);
  
  const narkozban = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`🧹 Başarıyla banlandı`)
  .setAuthor(`${message.author.tag} Tarafından Banlandı`, message.author.avatarURL)
  .setTimestamp()
  message.channel.send(narkozban)
  /*
return message.guild.channels.get(modlog.id).send(narkozban);
    */
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ban', 'yasakla'],
  permLevel: 3,
    kategori: "moderasyon",
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'yasakla <@kullanıcı> <sebep>',
 
};