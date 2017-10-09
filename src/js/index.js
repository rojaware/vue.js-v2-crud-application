
var users = [
            { id: 1, name: "John", fullName: "John Doe", role: "gcm-user" },
            { id: 2, name: "Jane", fullName: "Jane Hello", role: "gcm-admin" },
            { id: 3, name: "Susan", fullName: "Susan Kim", role: "gcm-fo" },
            { id: 4, name: "Chris", fullName: "Chris Cho", role: "petr-it-admin" },
            { id: 5, name: "Dan", fullName: "Dan Paddock", role: "petr-it-security" }
        ];
const roles = ['Choose', 'gcm-user', 'gcm-admin', 'petr-it-security', 'petr-it-admin', 'gcm-fo'];
                
var message = 'You loaded this page on ' + new Date().toLocaleString() ;

function findUser (name) {
  return users[findUserKey(name)];
};

function findUserKey (name) {
  for (var key = 0; key < users.length; key++) {
    if (users[key].name == name) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#user-list',
  data: function () {
    return {users: users, searchKey: '', message: message};
  },
  computed : {
    filteredUsers: function () {
    var self = this;
    console.log()

    return self.users.filter(user => {
       return user.name.toLowerCase().indexOf(self.searchKey.toLowerCase()) > -1
    })
  }
}
});

var User = Vue.extend({
  template: '#user',
  data: function () {
    return {user: findUser(this.$route.params.user_name)};
  }
});

var UserEdit = Vue.extend({
  template: '#user-edit',
  data: function () {
    return {user: findUser(this.$route.params.user_name) , roles: roles};
  },
  methods: {
    updateUser: function () {
      var user = this.user;

      users[findUserKey(user.name)] = {
        id: user.id,
        name: user.name,
        fullName: user.fullName,
        role: user.role
      };
      router.push('/');
      message = user.name + '('+ user.fullName +') has been mapped to ' + user.role + ' on ' + new Date().toLocaleString() ;
    }
  }
});

var UserDelete = Vue.extend({
  template: '#user-delete',
  data: function () {
    return {user: findUser(this.$route.params.user_name)};
  },
  methods: {
    deleteUser: function () {
      users.splice(findUserKey(this.$route.params.user_name), 1);
      router.push('/');
      message = user.name + '('+ user.fullName +') has been deleted on ' + new Date().toLocaleString() ;
    }
  }
});

var AddUser = Vue.extend({
  template: '#add-user',
  data: function () {
    return {user: {name: '', fullName: '', role: 'Choose'}, roles: roles }
  },
  methods: {
    createUser: function() {
      var user = this.user;
      users.push({
        id: Math.random().toString().split('.')[1],
        name: user.name,
        fullName: user.fullName,
        role: user.role
      });
      router.push('/');
      message = user.name + '('+ user.fullName +') has been mapped to ' + user.role + ' on ' + new Date().toLocaleString() ;
    }
  }
});

var router = new VueRouter({
  routes: [{path: '*' , component: List}, 
    {path: '/user/:user_name', component: User, name: 'user'},
    {path: '/add-user', component: AddUser},
    {path: '/user/:user_name/edit', component: UserEdit, name: 'user-edit'},
    {path: '/user/:user_name/delete', component: UserDelete, name: 'user-delete'}
]});

new Vue({
  el: '#app',
  router: router,
  template: '<router-view></router-view>'
});
