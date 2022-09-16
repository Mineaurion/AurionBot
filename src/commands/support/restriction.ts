import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash } from "discordx";



@Discord()
export class test2 {
@Slash('restriction')
defaultCommand(interaction: CommandInteraction): void {
  interaction.reply({
    embeds: [commentclaim],
  })
}
}

const commentclaim = new EmbedBuilder()
.setColor('DarkRed')
.setTitle('Restrictions sur l\'ensemble des modpacks')
.setURL('https://forum.mineaurion.com/topic/2653/quelques-restrictions-dans-les-grandes-lignes')
.setAuthor({ name: 'AurionBot', iconURL: 'https://i.imgur.com/oYd0rhO.png', url: 'https://mineaurion.com' })
.addFields(

    { name:'Bonjour à toutes et à tous !', value: ' Joueuses et joueurs de Mineaurion, dans ce sujet, vous retrouverez des "conseils" pour permettre d\'avoir une base la plus optimisée possible. Vous retrouverez également les limitations déjà présentes sur les serveurs de Mineaurion. Ces limitations sont applicables par tout le monde. Nous partons sur le principe que les restrictions s\'appliquent à la base du joueur.'},
    { name:'Pourquoi ces limites ? ', value: 'Ces limites peuvent vous paraître assez autoritaires, mais elles permettent de pouvoir avoir la meilleure expérience de jeu possible, mais aussi la plus agréable, que ce soit pour vous ou avec envers le staff afin de prévenir tout sur dimensionnement. Vous êtes sur un serveur communautaire, il faut donc ce partager les ressources disponible.'},
    { name:'Nota ', value: 'Si vous êtes plusieurs dans la même base, les restrictions restent les mêmes, ce ne sont pas des restrictions par personne (sauf contre indication contraire). '},
    { name:'Vous retrouverez les restrictions ici  ', value: 'https://forum.mineaurion.com/topic/2653/quelques-restrictions-dans-les-grandes-lignes'},

)
.setImage("http://i.imgur.com/ggui5Ac.png")
.setTimestamp()
.setFooter({ text: 'AurionBot', iconURL: 'https://i.imgur.com/oYd0rhO.png' });