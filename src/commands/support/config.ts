import {
  APIEmbedField,
  ColorResolvable,
  resolveColor,
  RestOrArray,
} from 'discord.js';

export type SupportEmbed = {
  color: ColorResolvable;
  title: string;
  url?: string;
  description?: string;
  image?: string;
  fields: RestOrArray<APIEmbedField>;
};

export const isSecondChoice = (
  supportEmbed: SupportEmbed[] | Record<string, SupportEmbed[]>,
): supportEmbed is Record<string, SupportEmbed[]> => {
  return !Array.isArray(supportEmbed);
};

export const supportEmbed: Record<
  string,
  SupportEmbed[] | Record<string, SupportEmbed[]>
> = {
  restriction: [
    {
      color: resolveColor('DarkRed'),
      title: "Restrictions sur l'ensemble des modpacks",
      image: 'http://i.imgur.com/ggui5Ac.png',
      fields: [
        {
          name: 'Bonjour à toutes et à tous !',
          value:
            'Joueuses et joueurs de Mineaurion, dans ce sujet, vous retrouverez des "conseils" pour permettre d\'avoir une base la plus optimisée possible. Vous retrouverez également les limitations déjà présentes sur les serveurs de Mineaurion. Ces limitations sont applicables par tout le monde. Nous partons sur le principe que les restrictions s\'appliquent à la base du joueur.',
        },
        {
          name: 'Pourquoi ces limites ?',
          value:
            'Ces limites peuvent vous paraître assez autoritaires, mais elles permettent de pouvoir avoir la meilleure expérience de jeu possible, mais aussi la plus agréable, que ce soit pour vous ou avec envers le staff afin de prévenir tout sur dimensionnement. Vous êtes sur un serveur communautaire, il faut donc ce partager les ressources disponible.',
        },
        {
          name: 'Nota',
          value:
            'Si vous êtes plusieurs dans la même base, les restrictions restent les mêmes, ce ne sont pas des restrictions par personne (sauf contre indication contraire).',
        },
        {
          name: 'Vous retrouverez les restrictions ici',
          value:
            'https://forum.mineaurion.com/topic/2653/quelques-restrictions-dans-les-grandes-lignes',
        },
      ],
    },
  ],
  claim: [
    {
      color: resolveColor('Purple'),
      title: 'Comment claim votre base ?',
      image:
        'https://forum.mineaurion.com/assets/uploads/files/1556449629103-e507e5b7-9936-43e0-963c-0b68138b8700-image.png',
      fields: [
        {
          name: "La base d'un claim",
          value:
            "Le claim permet la protection d'une zone définie par une personne. Seule la personne qui a claim et les membres du staff peuvent accéder à votre claim et y faire des modifications de base, mais vous pouvez aussi y ajouter des amis avec plus ou moins de permissions.",
        },
        {
          name: 'Comment claim',
          value:
            "A l'aide d'une **pelle en or**, vous sélectionnerez les **deux extrémités** de la zone que vous souhaitez claim. Quand vous cliquez une **première fois**, un bloc de **glowstone** s'affiche, allez dans l'autre coin et **cliquez à nouveau**. Une fois cela fait vous aurez votre zone qui se définira comme l'image ci-jointe.",
        },
      ],
    },
  ],
  launcher: {
    'Présentation du launcher': [
      {
        color: resolveColor('Blue'),
        title: 'Support - Launcher',
        url: 'https://forum.mineaurion.com/topic/2044',
        fields: [
          {
            name: 'Si vous avez des crashs récurent, regardez ici ',
            value: 'https://forum.mineaurion.com/topic/2660/cas-de-crashs',
          },
        ],
      },
    ],
    "Que faire si j'ai une erreur comme ca ?": [
      {
        color: resolveColor('Blue'),
        title: "Que faire si j'ai une erreur comme ça ?",
        url: 'https://forum.mineaurion.com/topic/2047',
        image:
          'https://forum.mineaurion.com/assets/uploads/files/1589739520605-430f9ed9-dc1c-4b4c-a38c-fdcc7fe58971-image.png',
        fields: [
          {
            name: 'Voici comment corriger cette erreur ci-jointe.',
            value:
              "Votre version de Java n'est pas la bonne. Vous avez actuellement la version 32 bits d'installé sur votre ordinateur.",
          },
          {
            name: 'Etape 1 :',
            value:
              'Allez dans Panneau de configuration puis Desintaller un programme. Le programme qui nous interesse ce nome "java". Desintallez le. ',
          },
          { name: 'Etape 2 :', value: 'Redémarrez votre ordinateur.' },
          {
            name: 'Etape 3 ( Serveur 1.7.10 à 1.16.5 ) :',
            value:
              'Rendez-vous sur ce site web : https://www.java.com/fr/download/',
          },
          {
            name: 'Etape 3 ( Serveur 1.18.2 ) :',
            value:
              'Si vous êtes sur un serveur 1.18 merci de prendre ce lien ci : https://download.oracle.com/java/17/archive/jdk-17.0.4_windows-x64_bin.exe',
          },
          {
            name: 'Etape 4 :',
            value:
              'Cliquez sur "voir tous les téléchargements Java. Prenez celui nomé "Windows Hors ligne (64bits)',
          },
          {
            name: 'Etape 5 :',
            value:
              'Téléchargez le, installez le et redémarrez votre ordinateur.',
          },
          { name: 'Enjoy !', value: ' Bon jeu à vous' },
        ],
      },
    ],
    'Installation du launcher': [
      {
        color: resolveColor('Blue'),
        title: 'Installation personnalisé du launcher',
        url: 'https://forum.mineaurion.com/topic/2046',
        image:
          'https://forum.mineaurion.com/assets/uploads/files/1498327516273-9e40783d-71ec-4f95-85c6-9609f1abe0b1-image.png',
        fields: [
          {
            name: 'Installation personnalisé du launcher',
            value:
              'Pour pouvoir choisir l’emplacement que vous souhaitez, vous devez, avant de lancer l’installation, créé un fichier texte Portable.txt à l’emplacement souhaité.',
          },
        ],
      },
    ],
    'Version du launcher': [
      {
        color: resolveColor('Blue'),
        title: 'Installer la bonne version du launcher - V.4.10',
        url: 'https://forum.mineaurion.com/topic/2046',
        image:
          'https://forum.mineaurion.com/assets/uploads/files/1498326984844-a675db59-a551-4218-a4da-acd5e0d9ce3c-image-resized.png',
        fields: [
          {
            name: 'Mise à jour du launcher',
            value:
              "Si vous n'arrivez pas à mettre à jour la liste des serveurs vous avez surement une ancienne version de celle-ci.",
          },
          {
            name: 'Mettre à jour le launcher',
            value:
              'Rendez-vous ici afin de télécharger la dernière version du launcher : https://github.com/Mineaurion/Launcher/releases/',
          },
          {
            name: 'La mise à jour ne fonctionne pas ?',
            value:
              'Un problème connu concernant la mise à jour du launcher impossible est facilement résolvable. Allez dans vos documents et supprimez le dossier **Mineaurion Launcher**.',
          },
          {
            name: 'Enjoy',
            value: 'Normalement tout est solutionné ! Bon jeu à vous ! ',
          },
        ],
      },
    ],
  },
  unkownhost: [
    {
      color: resolveColor('Purple'),
      title: 'Problème "Unknow Host"',
      image: 'https://playit.gg/support/post-img/minecraft-unknown-host.png',
      fields: [
        {
          name: 'Solution N°1 - Flush DNS',
          value:
            "Lancer un invité de commande et taper la commande **ipconfig /flushdns** ( assurez vous d'avoir l'accès administrateur )",
        },
        {
          name: 'Solution N°2 - Changer ses DNS',
          value:
            'Le but est de changer ses DNS en passant par ceux de google. Pour ce faire, suivez ce tutoriel : **https://bit.ly/3NJjKVZ**',
        },
      ],
    },
  ],
  maintenanceserver: [
    {
      color: resolveColor('Purple'),
      title:
        'Problème Failed to log in:  The authentification servers are currently  down for maintenance',
      image:
        'https://user-images.githubusercontent.com/7802164/202239166-1e44cc0b-3dfb-45cc-b85e-f2fadc964d78.png',
      fields: [
        {
          name: 'Consulter le site internet',
          value:
            'Consultez le site https://minecraft-api.com/mojang/ et regardez si l authentification est bien en ligne',
        },
        {
          name: 'Le service est en ligne ?',
          value:
            'Si le service est en ligne, redemarrer votre jeu cela devrais résoudre le soucis !',
        },
        {
          name: 'Le service est hors ligne ?',
          value:
            'Malheureusement vous allez devoir attendre que le service redevienne opérationnel. Attendez quelques instants et essayez de vous reconnecter !',
        },
      ],
    },
  ],
};
