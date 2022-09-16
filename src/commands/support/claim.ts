import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash } from "discordx";



@Discord()
export class test2 {
@Slash('claim')
defaultCommand(interaction: CommandInteraction): void {
  interaction.reply({
    embeds: [commentclaim],
  })
}
}

const commentclaim = new EmbedBuilder()
.setColor('Purple')
.setTitle('Comment claim votre base ?')
.setURL('https://mineaurion.com/')
.setAuthor({ name: 'AurionBot', iconURL: 'https://i.imgur.com/oYd0rhO.png', url: 'https://mineaurion.com' })
.addFields(

    { name:'La base d\'un claim', value: 'Le claim permet la protection d\'une zone définie par une personne. Seule la personne qui a claim et les membres du staff peuvent accéder à votre claim et y faire des modifications de base, mais vous pouvez aussi y ajouter des amis avec plus ou moins de permissions.'},
    { name:'Comment claim', value: 'A l\'aide d\'une **pelle en or**, vous sélectionnerez les **deux extrémités** de la zone que vous souhaitez claim. Quand vous cliquez une **première fois**, un bloc de **glowstone** s\'affiche, allez dans l\'autre coin et **cliquez à nouveau**. Une fois cela fait vous aurez votre zone qui se définira comme l\'image ci-jointe.'},
)
.setImage('https://forum.mineaurion.com/assets/uploads/files/1556449629103-e507e5b7-9936-43e0-963c-0b68138b8700-image.png')
.setTimestamp()
.setFooter({ text: 'AurionBot', iconURL: 'https://i.imgur.com/oYd0rhO.png' });