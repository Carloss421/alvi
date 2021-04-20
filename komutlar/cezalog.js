const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let mlog = message.mentions.channels.first()
  let cezalog = db.fetch(`mlog_${message.guild.id}`)

if(args[0] === "sıfırla") {
    if(!cezalog) {
      message.channel.send(new Discord.RichEmbed()
      .setDescription(`:x: | Mod Log Kanalı zaten ayarlı değil.`)
      .setColor("RED"))                     
      return
    }
    
    db.delete(`mlog_${message.guild.id}`)
    message.channel.send(new Discord.RichEmbed()
     .setDescription(`✅ | Ceza Log Kanalı başarıyla sıfırlandı.`)
      .setColor("GREEN"))                   
    return
  }


  
  if (!mlog) {
    return message.channel.send(new Discord.RichEmbed()
     .setDescription(`:x: | Mod Log Kanalı etiketlemelisin.`)
    .setColor("RED"))                          
  }
  
  
  
  
  db.set(`mlog_${message.guild.id}`, mlog.id)
  
   // message.channel.send(`Otorol \`${rol.name}\`, otorol kanalı ${rolk} olarak ayarlandı.`)
  
  const embed = new Discord.RichEmbed()
        .setDescription(`✅ Mod Log Kanalı başarıyla ${mlog} olarak ayarlandı.\nKanalı sıfırlamak için **a!cezalog sıfırla** yazabilirsiniz!`)
        .setColor("RANDOM")
        .setTimestamp()
    message.channel.send({embed})
  
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ceza-log'],
    permLevel: 0
}

exports.help = {
    name: 'cezalog-ayarla',
    description: 'Mod-log kanalı ayarlar.',
    usage: 'mod-log #kanal'
}