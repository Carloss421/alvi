const Discord = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyAqi6LvT3nLMefsoDiXuHaptzamMUjU3Z8');

exports.run = async (client, message, args) => {
    const queue = client.queue;

    var searchString = args.slice(0).join(' ');
    var url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    var serverQueue = queue.get(message.guild.id);//böyle amk

    var voiceChannel = message.member.voiceChannel;//tüm thisleri message yap 

    const embed = new Discord.MessageEmbed()
    .setColor("#0f0f0f")
    .setTitle(":x: Eksik bağımsız değişkenler")
    .setDescription("a!play [Bağlantı veya sorgu]")
    if (!args[0]) return message.channel.send(embed);

    const voiceChannelAdd = new Discord.MessageEmbed()
    .setColor("#0f0f0f")
    .setDescription(`:x: **Bu komutu kullanmak için bir ses kanalında olmanız gerekir.**`)
    if (!voiceChannel) return message.channel.send(voiceChannelAdd);

    var permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has('CONNECT')) {
      const warningErr = new Discord.MessageEmbed()
      .setColor("#0f0f0f")
      .setDescription(`:x: Herhangi bir ses kanalına katılmak için yeterli iznim yok.`)
      return message.channel.send(warningErr);
    }
    if (!permissions.has('SPEAK')) {
      const musicErr = new Discord.MessageEmbed()
      .setColor("#0f0f0f")
      .setDescription(`:x: Kanalda konuşmaya iznim olmadığı veya mikrofonum kapalı olduğu için müziği açamıyorum / şarkı çalamıyorum.`)
      return message.channel.send(musicErr);
    }
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      var playlist = await youtube.getPlaylist(url);
      var videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        var video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, message.message, voiceChannel, true);
      }
      const PlayingListAdd = new Discord.MessageEmbed()
      .setColor("#0f0f0f")
      .setDescription(`[${playlist.title}](https://www.youtube.com/watch?v=${playlist.id}) şarkının çalma listesine eklendi!`)
      return message.channel.send(PlayingListAdd);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
      try {
          var videos = await youtube.searchVideos(searchString, 10);

          var r = 1

          var video = await youtube.getVideoByID(videos[r - 1].id);
        } catch (err) {
          console.error(err);
          const songNope = new Discord.MessageEmbed()
          .setColor("#0f0f0f")
          .setDescription(`:x: No song could be found with the name you were looking for!`) 
          return message.channel.send(songNope);
        }
      }
      return handleVideo(video, message, voiceChannel);
    }

    async function handleVideo(video, message, voiceChannel, playlist = false) {
        var serverQueue = queue.get(message.guild.id);

        var song = {
          id: video.id,
          title: video.title,
          durationh: video.duration.hours,
          durationm: video.duration.minutes,
          durations: video.duration.seconds,
          url: `https://www.youtube.com/watch?v=${video.id}`,
          thumbnail: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
          requester: message.author.tag,
        };
        if (!serverQueue) {
          var queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 3,
            playing: true
          };
          queue.set(message.guild.id, queueConstruct);

          queueConstruct.songs.push(song);

          try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
          } catch (error) {
            console.error(`:x: Ses kanalına giremedim HATA: ${error}`);
            queue.delete(message.guild.id);
            return message.channel.send(`:x: Ses kanalına giremedim HATA: ${error}`);
          }
        } else {
          serverQueue.songs.push(song);

          if (playlist) return undefined;

          const songListBed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id}) sıraya eklendi!`)
          return message.channel.send(songListBed);
        }
        return undefined;
      }
        function play(guild, song) {
        var serverQueue = queue.get(guild.id);

        if (!song) {
          serverQueue.voiceChannel.leave();
          voiceChannel.leave();
          queue.delete(guild.id);
          return;
        }

        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
          .on('end', reason => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
          })
          .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

        let y = ''
        if (song.durationh === 0) {
            y = `${song.durationm || 0}:${song.durations || 0}`
        } else {
            y = `${song.durationh || 0}:${song.durationm || 0}:${song.durations || 0}`
        }

        const playingBed = new Discord.MessageEmbed()
        .setColor("#0f0f0f")
        .setAuthor(`Now Playing`, song.thumbnail)
        .setDescription(`[${song.title}](${song.url})`)
        .addField("Oynamaya kadar tahmini süre", `${y}`, true)
        .addField("Şarkıyı Açan Kullanıcı", `${song.requester}`, true)
        .setThumbnail(song.thumbnail)
        serverQueue.textChannel.send(playingBed);
      }  
};

exports.conf = {
    enabled: true,
    aliases: ['p'],
    permLevel: 0
};

exports.help = {
    name: 'play',
    description: 'Belirttiğiniz şarkıyı bulunduğunuz sesli kanalda çalar/oynatır.',
    usage: 'oynat [şarkı adı]'
};