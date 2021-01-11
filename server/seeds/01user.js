
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Admin', user_pw: '$2b$10$8lg.0GW3dbexHXfRdQRFsOY31hLyGL2VxD7ekJ.sIwTgZZRdl3dS.', first_name: 'Admin', last_name: 'Admin', email:'admin@test.com', img:'https://visualpharm.com/assets/23/Woman%20Profile-595b40b65ba036ed117d36ff.svg'  },
        {username: 'newpowerbeer', user_pw: '$2b$10$8lg.0GW3dbexHXfRdQRFsOY31hLyGL2VxD7ekJ.sIwTgZZRdl3dS.', first_name: 'Newpowerbeer', last_name: 'Arnold', email:'newpowerbeer@test.com', img:'https://cdn.discordapp.com/attachments/790378724763631625/791202624157646848/2Q.png'  },
        {username: 'angelayu', user_pw: '$2b$10$8lg.0GW3dbexHXfRdQRFsOY31hLyGL2VxD7ekJ.sIwTgZZRdl3dS.', first_name: 'Angela', last_name: 'Yu', email:'angelayu@test.com', img:'https://cdn.lynda.com/authors/1993152671_250x250_thumb.jpg'  },
        {username: 'mayapolarbear', user_pw: '$2b$10$8lg.0GW3dbexHXfRdQRFsOY31hLyGL2VxD7ekJ.sIwTgZZRdl3dS.', first_name: 'Maya', last_name: 'Polarbear', email:'mayapolarbear@test.com', img:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1039107149484449792%2FYGaNepH4_400x400.jpg'  },
      ]);
    });
};