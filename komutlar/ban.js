const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {
  

    
  if (!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.reply('Gerekli izin yok')

  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
 
  if (message.mentions.users.size < 1) return message.reply('Banalamak İstediğiniz Kişiyi Etiketleyiniz');
  if (reason.length < 1) return message.reply('Sebeb belirtin');
  if (user.id === message.author.id) return message.reply('Kendini Banlayamazssın');


  

  message.guild.ban(user, 2);
  
  const narkozban = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`🧹 Başarıyla banlandı`)
  .setAuthor(`${message.author.tag} Tarafından Banlandı`, message.author.avatarURL)
  .setTimestamp()
.setFooter(`${client.user.username} `, client.user.avatarURL);
  message.channel.send(narkozban)
    
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