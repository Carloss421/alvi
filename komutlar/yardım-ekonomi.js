const Discord = require('discord.js')
exports.run = function(client, message, args) {
let yardim = new Discord.MessageEmbed()
.setTitle("Ovanakovic Yardım Menüsü")
.setColor("RANDOM")
.addField("💰 | Ekonomi",`
**\`!yardım ekonomi\`** - Ekonomi Komutları Hakkında Yardım Alırsınız

\`günlük\`, \`çalış\`, \`soygun\`, \`yatır\`, \`çek\`, \`gönder\``)
.addField("🎲 | Oyunlar",`
**\`!yardım oyunlar\`** - Oyunlar Komutları Hakkında Yardım Alırsınız

\`balık-tut\`, \`bahis\`, \`slot\``)
.addField("💼 | Destek",`
**\`!yardım destek\`** - Destek Komutları Hakkında Yardım Alırsınız

\`davet\`, \`yapımcım\`, \`destek\`,\`yardım\`

`)

let ekonomi = new Discord.MessageEmbed()
.setTitle("💰 | Ekonomi Komutları")
.setColor("RANDOM")
.setDescription(`
\`!günlük\`    =>  24 saat aralıkla günlük bir ödül alırsınız.
\`!para\`      =>  Etiketlediğiniz kişinin veya kendi paranızı görürsünüz.
\`!gönder\`    =>  Etiketlediğiniz kullanıcıya para gönderirsiniz.
\`!soygun\`    =>  10 dakikada bir soygun yaparsınız.
\`!çalış\`     =>  Rastgele bir işte çalışıp maaş alırsınız.
\`!yatır\`     =>  Kendi cüzdanınızdan bankaya para yatırırsınız.
\`!çek\`       =>  Bankadan kendi cüzdanınıza para çekersiniz.
\`!çal\`       =>  Etiketlediğiniz kişinin cüzdanından para çalarsınız.\n
• [Destek Sunucumuz](Destek Sunucunuzun Sınırsız Davet Linki)`)

let oyunlar = new Discord.MessageEmbed()
.setTitle("🎲 | Oyun Komutları")
.setColor("RANDOM")
.setDescription(`
\`!bahis\`     =>  Bahis oynarsınız, para kaybeder veya 2 katını kazanırsınız.
\`!slot\`      =>  Slots oynarsınız, para kaybeder veya 2 katını kazanırsınız.
\`!balık-tut\` =>  Balık tutarsınız, rastgele para kazanırsınız veya kaybedersiniz.\n
[Destek Sunucumuz](Destek Sunucunuzun Sınırsız Davet Linki)`)

  
};

exports.conf = {
    enabled: true, 
    aliases: ["yardım-ekonomi"],
  };
  
  exports.help = {
    name: 'Yardım'
  };