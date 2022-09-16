import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';

@Discord()
export class DiscordBot {
  @Slash('launcher')
  hello(
    @SlashChoice({ name: 'Cas de Crashs', value: 'casdecrash' })
    @SlashChoice({
      name: 'Présentation du launcher',
      value: 'presentationlauncher',
    })
    @SlashChoice({
      name: "Que faire si j'ai une erreur comme ca ?",
      value: 'erreurcommeca',
    })
    @SlashChoice({
      name: 'Ou trouver les crashs reports ou les logs',
      value: 'outrouverlescrashs',
    })
    @SlashChoice({ name: 'Installation du launcher', value: 'installation' })
    @SlashOption('launcher', { description: 'Choix concernant le launcher' })
    text: string,
    interaction: CommandInteraction,
  ): Promise<unknown> | unknown {
    if (text === 'casdecrash') {
      return interaction.reply({
        embeds: [launchercasdecrashs],
        ephemeral: false,
      });
    } else if (text === 'presentationlauncher') {
      return interaction.reply({
        embeds: [supportLauncher],
        ephemeral: false,
      });
    } else if (text === 'erreurcommeca') {
      return interaction.reply({
        embeds: [supportErreurCommeCa],
        ephemeral: false,
      });
    } else if (text === 'installation') {
      return interaction.reply({
        embeds: [supportInstallationLauncher],
        ephemeral: false,
      });
    }
  }
}
// --------------------
const launchercasdecrashs = new EmbedBuilder()
  .setColor('Blue')
  .setTitle('Support - Launcher ')
  .setURL('https://forum.mineaurion.com/category/35/wiki')
  .setAuthor({
    name: 'AurionBot',
    iconURL: 'https://i.imgur.com/oYd0rhO.png',
    url: 'https://mineaurion.com',
  })
  .setDescription('Cas de crash')
  .addFields({
    name: 'Si vous avez des crashs récurent, regardez ici ',
    value: 'https://forum.mineaurion.com/topic/2660/cas-de-crashs',
  })
  .setTimestamp()
  .setFooter({ text: 'AurionBot', iconURL: 'https://i.imgur.com/oYd0rhO.png' });

const supportLauncher = new EmbedBuilder()
  .setColor('Blue')
  .setTitle('Présentation du launcher')
  .setURL('https://forum.mineaurion.com/topic/2044/launcher')
  .setAuthor({
    name: 'AurionBot',
    iconURL: 'https://i.imgur.com/oYd0rhO.png',
    url: 'https://mineaurion.com',
  })
  .addFields(
    {
      name: 'Tu peux retrouver le launcher à cette adresse : ',
      value: 'https://mineaurion.com/#launcher',
    },
    {
      name: 'A quoi sert-il ? ',
      value:
        'Notre launcher est un regroupement des modpacks que nous accueillons sur le serveur de Mineaurion.Il permet d’avoir la possibilité de pouvoir choisir un modpack selon votre envie et de pouvoir ensuite vous connecter au serveur voulu. La version des modpacks disponibles via le launcher est toujours la même que celle des serveurs, ce qui vous permet de vous y connecter peut importe les mises à jour officielles des modpacks.',
    },
    {
      name: ':tools: Avant de lancer le modpack',
      value:
        'Rendez-vous dans les options Java pour modifier la quantité de mémoire vive maximale. pour la 1.7 4GO est recommandé. Pour la 1.8 et + 8GO est recommandé.',
    },
  )
  .setTimestamp()
  .setFooter({ text: 'AurionBot', iconURL: 'https://i.imgur.com/oYd0rhO.png' });

const supportErreurCommeCa = new EmbedBuilder()
  .setColor('Blue')
  .setTitle("Que faire si j'ai une erreur comme ça ?")
  .setURL(
    'https://forum.mineaurion.com/topic/2047/que-faire-si-j-ai-une-erreur-comme-%C3%A7a/3',
  )
  .setAuthor({
    name: 'AurionBot',
    iconURL: 'https://i.imgur.com/oYd0rhO.png',
    url: 'https://mineaurion.com',
  })
  .addFields(
    {
      name: 'Voici comment corriger cette erreur ci-jointe.',
      value:
        "Votre version de Java n'est pas la bonne. Vous avez actuellement la version 32 bits d'installé sur votre ordinateur.",
    },
    {
      name: 'Etape 1 : ',
      value:
        'Allez dans Panneau de configuration puis Desintaller un programme. Le programme qui nous interesse ce nome "java". Desintallez le. ',
    },
    { name: 'Etape 2 : ', value: 'Redemarrez votre ordinateur.' },
    {
      name: 'Etape 3 ( Serveur 1.7.10 à 1.16.5 ) : ',
      value: 'Rendez-vous sur ce site web : https://www.java.com/fr/download/ ',
    },
    {
      name: 'Etape 3 ( Serveur 1.18.2 ) : ',
      value:
        'Si vous êtes sur un serveur 1.18 merci de prendre ce lien ci : https://download.oracle.com/java/17/archive/jdk-17.0.4_windows-x64_bin.exe',
    },
    {
      name: 'Etape 4 : ',
      value:
        'Cliquez sur "voir tous les téléchargements Java. Prenez celui nomé "Windows Hors ligne (64bits)',
    },
    {
      name: 'Etape 5 : ',
      value: 'Téléchargez le, installez le et redémarrez votre ordinateur.',
    },
    { name: 'Enjoy ! ', value: ' Bon jeu à vous ' },
  )
  .setImage(
    'https://forum.mineaurion.com/assets/uploads/files/1589739520605-430f9ed9-dc1c-4b4c-a38c-fdcc7fe58971-image.png',
  )
  .setTimestamp()
  .setFooter({ text: 'AurionBot', iconURL: 'https://i.imgur.com/oYd0rhO.png' });

const supportInstallationLauncher = new EmbedBuilder()
  .setColor('Blue')
  .setTitle('Installation personnalisé du launcher')
  .setURL('https://forum.mineaurion.com/topic/2046/installation-du-launcher')
  .setAuthor({
    name: 'AurionBot',
    iconURL: 'https://i.imgur.com/oYd0rhO.png',
    url: 'https://mineaurion.com',
  })
  .addFields({
    name: 'Installation personnalisé du launcher ',
    value:
      'Pour pouvoir choisir l’emplacement que vous souhaitez, vous devez, avant de lancer l’installation, créé un fichier texte Portable.txt à l’emplacement souhaité.',
  })
  .setImage(
    'https://forum.mineaurion.com/assets/uploads/files/1498327516273-9e40783d-71ec-4f95-85c6-9609f1abe0b1-image.png',
  )
  .setTimestamp()
  .setFooter({ text: 'AurionBot', iconURL: 'https://i.imgur.com/oYd0rhO.png' });
