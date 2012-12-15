module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      dist : {
        src: [
          "js/core/bootstrap-transition.js",
          "js/core/bootstrap-alert.js",
          "js/core/bootstrap-button.js",
          "js/core/bootstrap-carousel.js",
          "js/core/bootstrap-collapse.js",
          "js/core/bootstrap-dropdown.js",
          "js/core/bootstrap-modal.js",
          "js/core/bootstrap-tooltip.js",
          "js/core/bootstrap-popover.js",
          "js/core/bootstrap-scrollspy.js",
          "js/core/bootstrap-tab.js",
          "js/core/bootstrap-typeahead.js",
          "js/core/bootstrap-affix.js",
          "js/libs/*.js",
          "js/extra/*.js"
        ],
        dest: 'js/bootstrap.js'
      }
    },
    min: {
      dist: {
        src: ['js/bootstrap.js'],
        dest: 'js/bootstrap.min.js'
      }
    },
    mincss: {
      compress: {
        files: {
         "css/bootstrap.min.css": "css/bootstrap.css",
         "css/bootstrap-responsive.min.css" : "css/bootstrap-responsive.css"
        }
      }
    },
    less: {
      compile: {
        options: {
          paths: ["./less/","./less/core/","./less/extra/","./less/extra/*"]
        },
        files: {
          "css/bootstrap.css":"less/core/bootstrap.less",
          "css/bootstrap-responsive.css":"less/core/responsive.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-mincss');

  grunt.registerTask('default', 'concat min less mincss');

};