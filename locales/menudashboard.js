module.exports =
  [

    {
      id:1,
      name: 'dashboard',
      active: true,
      href: '/dashboard',
      children:[]
    },
    {
      id:1,
      name: 'Article',
      icon: 'icofont-document-folder',
      active:true,
      children: [
        {
          id:2,
          icon: 'icofont-ui-folder',
          href: '/dashboard/articlegroup',
          name: 'articlegroup',
          active:true,
        },
        {
          id:3,
          icon: 'icofont-listing-box',
          href: '/dashboard/articlelist',
          name: 'textlist',
          active:true,
        },
        {
          id:4,
          icon: 'icofont-label ',
          href: '/dashboard/hashtag',
          name: 'hashtag',
          active:true,
        },
        {
          id:5,
          icon: 'icofont-label ',
          href: '/dashboard/blogsetting',
          name: 'blogsetting',
          active:true,
        }
      ]

    },
    {
      id:6,
      name: 'Setting',
      icon: 'icofont-ui-settings',
      active:true,
      children: [
        {
          id:7,
          icon: 'icofont-settings',
          href: '/dashboard/setting',
          name: 'Setting',
          active:true
        },
        {
          id:8,
          icon: 'icofont-page',
          href: '/dashboard/firstpage',
          name: 'firstpage',
          active:false
        },
        {
          id:9,
          icon: 'icofont-phone',
          href: '/dashboard/contactus',
          name: 'contactus',
          active:true
        },
        {
          id:10,
          icon: 'icofont-info-circle',
          href: '/dashboard/about',
          name: 'aboutpage',
          active:false
        }
      ]
    },
    {
      id:11,
      name: 'other',
      icon: 'icofont-star',
     active:true,
      children: [
        {
          id:12,
          icon: 'icofont-picture',
          href: '/dashboard/gallery',
          name: 'gallery',
          active:true
        },
        {
          id:13,
          icon: 'icofont-info',
          href: '/dashboard/about',
          name: 'about',
          active:false
        },
        {
          id:14,
          icon: 'icofont-letter',
          href: '/dashboard/requestlist',
          name: 'requestlist',
          active:false
        },
        {
          id:14,
          icon: 'icofont-letter',
          href: '/dashboard/menus',
          name: 'menus',
          active:true
        },
      ]
    },

    {

      name: 'users',
      icon: 'icofont-users-alt-5',
      children: [
        {
          icon: 'icofont-listing-box ',
          href: '/dashboard/users',
          name: 'listusers',
          active:false
        },
        {
          icon: 'icofont-ruler-pencil-alt-1 ',
          href: '/dashboard/posting',
          name: 'post',
          active:false
        },
      ]
    },
    {

      name: 'featureandAttributes',
      icon: 'icofont-toggle-on',
      children: [
        {
          icon: 'icofont-verification-check',
          href: '/dashboard/product/Attributes',
          name: 'Attributes',
          active:true
        },
        {
          icon: 'icofont-verification-check ',
          href: '/dashboard/product/feature',
          name: 'feature',
          active:true
        },
        {
          icon: 'icofont-verification-check ',
          href: '/dashboard/product/color',
          name: 'colormanager',
          active:false
        },
        {
          icon: 'icofont-verification-check ',
          href: '/dashboard/product/object',
          name: 'objectmanager',
          active:false

        },
      ],

    },
    {

      name: 'product',
      icon: 'icofont-box',
      active:true,

      children: [
        {
          icon: 'icofont-verification-check',
          href: '/dashboard/product/productgroup',
          name: 'productgroup',
          active:true
        },
        {
          icon: 'icofont-verification-check ',
          href: '/dashboard/product',
          name: 'product',
          active:true
        },
        {
          icon: 'icofont-verification-check ',
          href: '/dashboard/product/layoutproduct',
          name: 'layoutproduct',
          active:false
        },
        {
          icon: 'icofont-verification-check ',
          href: '/dashboard/product/specailproducts',
          name: 'specilproducts',
          active:false
        },
      ]
    },
    {

      name: 'invoice',
      icon: 'icofont-list',
      active:false,
      children: [
        {
          icon: 'icofont-verification-check',
          href: '/dashboard/invoice',
          name: 'invoices',
          active:false
        },

      ]
    },
    {

      name: 'payandinvoicesetting',
      icon: 'icofont-gear',
     active:false,
      children: [
        {
          icon: 'icofont-verification-check',
          href: '/dashboard/posting/citypost',
          name: 'citysetting',
          active:false
        },
        {
          icon: 'icofont-verification-check ',
          href: '/dashboard/posting/postprice',
          name: 'postprice',
          active:false
        },


      ]
    },
    {

      name: 'comment',
      icon: 'icofont-comment',
       active:false,
      children: [
        {
          icon: 'icofont-verification-check',
          href: '/dashboard/comment/commentsetting',
          name: 'commentsetting',
          active:false
        },
        {
          icon: 'icofont-verification-check ',
          href: '/dashboard/comment/newcomment',
          name: 'newcomment',
          active:false
        },
        {
          icon: 'icofont-verification-check ',
          href: '/dashboard/comment/archivecomment',
          name: 'archivecomment',
          active:false
        }
      ]
    },
    {

      name: 'discounts',
      icon: 'icofont-sale-discount',
      active:false,
      children: [
        {
          icon: 'icofont-sale-discount',
          href: '/dashboard/discount',
          name: 'discountscode',
          active:false
        },
        {
          icon: 'icofont-star',
          href: '/dashboard/special',
          name: 'specialsale',
          active:false
        },

      ]
    },

    {
      name: 'statistics',
      icon: 'icofont-chart-histogram',
      active:false,
      children: [
        {
          icon: 'icofont-chart-histogram',
          href: '/dashboard/static/product',
          name: 'product',
          active:false
        },
        {
          icon: 'icofont-chart-histogram',
          href: '/dashboard/static/tag',
          name: 'tag',
          active:false
        },
        {
          icon: 'icofont-chart-histogram',
          href: '/dashboard/static/blog',
          name: 'blog',
          active:false
        },

      ]
    },
    {
      id:1,
      name: 'exit',
      href: '/logout',
      active: true,
      children:[]
    },
  ]

;
