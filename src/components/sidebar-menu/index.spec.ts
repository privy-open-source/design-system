import { defineMenu, filterMenu } from '.'

describe('filterMenu', () => {
  it('should not filter anything if access not defined', () => {
    const menus = defineMenu([
      {
        items: [
          {
            name : 'dashboard',
            label: 'Dashboard',
            url  : '/',
          },
          {
            name       : 'document',
            label      : 'Documents',
            url        : '/',
            collapsible: true,
            submenu    : [
              {
                name : 'need-action',
                label: 'Need Action',
                url  : '/',
              },
              {
                name : 'in-progress',
                label: 'In Progress',
                url  : '/',
              },
              {
                name : 'others',
                label: 'Others',
                url  : '/',
              },
            ],
          },
          {
            name : 'contact',
            label: 'Contacts',
            url  : '/',
          },
        ],
      },
      {
        condensed: true,
        title    : 'Quick Jump',
        items    : [
          {
            name : 'rejects',
            label: 'Rejects',
            url  : '/',
          },
          {
            name : 'archives',
            label: 'Archives',
            url  : '/',
          },
        ],
      },
      {
        bottom: true,
        items : [
          {
            name : 'settings',
            label: 'Settings',
            url  : '/',
          },
          {
            name : 'english',
            label: 'English',
            url  : '/',
            icon : './assets/images/img-flag.svg',
          },
        ],
      },
    ])

    expect(filterMenu(menus, 'personal')).toStrictEqual(menus)
  })

  it('should filter out menu which not in access', () => {
    const menus = defineMenu([
      {
        title : 'FAQ',
        access: '*',
      },
      {
        items: [
          {
            name  : 'dashboard',
            label : 'Dashboard',
            url   : '/',
            access: ['*'],
          },
          {
            name       : 'document',
            label      : 'Documents',
            url        : '/',
            collapsible: true,
            submenu    : [
              {
                name  : 'need-action',
                label : 'Need Action',
                url   : '/',
                access: ['sysadmin', 'personal'],
              },
              {
                name : 'in-progress',
                label: 'In Progress',
                url  : '/',
              },
              {
                name  : 'others',
                label : 'Others',
                url   : '/',
                access: ['sysadmin'],
              },
            ],
          },
          {
            name  : 'contact',
            label : 'Contacts',
            url   : '/',
            access: ['sysadmin'],
          },
        ],
      },
      {
        condensed: true,
        title    : 'SysAdmin Center',
        access   : 'sysadmin',
        items    : [
          {
            name : 'Dashboard',
            label: 'Dashboard',
            url  : '/admin',
          },
        ],
      },
      {
        condensed: true,
        title    : 'Quick Jump',
        items    : [
          {
            name : 'rejects',
            label: 'Rejects',
            url  : '/',
          },
          {
            name : 'archives',
            label: 'Archives',
            url  : '/',
          },
        ],
      },
      {
        bottom: true,
        items : [
          {
            name  : 'settings',
            label : 'Settings',
            url   : '/',
            access: 'sysadmin',
          },
          {
            name : 'english',
            label: 'English',
            url  : '/',
            icon : './assets/images/img-flag.svg',
          },
        ],
      },
    ])

    const output = filterMenu(menus, 'personal')

    expect(output).toStrictEqual([
      {
        title : 'FAQ',
        access: '*',
      },
      {
        items: [
          {
            name  : 'dashboard',
            label : 'Dashboard',
            url   : '/',
            access: ['*'],
          },
          {
            name       : 'document',
            label      : 'Documents',
            url        : '/',
            collapsible: true,
            submenu    : [
              {
                name  : 'need-action',
                label : 'Need Action',
                url   : '/',
                access: ['sysadmin', 'personal'],
              },
              {
                name : 'in-progress',
                label: 'In Progress',
                url  : '/',
              },
            ],
          },
        ],
      },
      {
        condensed: true,
        title    : 'Quick Jump',
        items    : [
          {
            name : 'rejects',
            label: 'Rejects',
            url  : '/',
          },
          {
            name : 'archives',
            label: 'Archives',
            url  : '/',
          },
        ],
      },
      {
        bottom: true,
        items : [
          {
            name : 'english',
            label: 'English',
            url  : '/',
            icon : './assets/images/img-flag.svg',
          },
        ],
      },
    ])
  })
})
