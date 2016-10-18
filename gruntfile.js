module.exports = function(grunt){
  grunt.initConfig({
      nodemon: {
      	all: {
              script: 'app.js',
              options: {
              	watchedExtentions:['js']
         }
       }
     }
  }) 

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.registerTask('default', ['nodemon']);
}