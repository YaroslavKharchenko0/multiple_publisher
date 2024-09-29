import { Router, HttpMethod } from './types';

export const router: Router = {
  account: {
    basePath: 'accounts',
    routes: {
      googleAuthUrl: {
        method: 'GET',
        path: '/auth/google/url',
      },
      googleCallback: {
        method: 'GET',
        path: '/auth/google/callback',
      },
      delete: {
        method: 'DELETE',
        path: '/:accountId',
      },
      findOne: {
        method: 'GET',
        path: '/:accountId',
      },
      update: {
        method: 'PATCH',
        path: '/:accountId',
      },
    },
  },
  accountProviders: {
    basePath: 'accounts/providers',
    routes: {
      findMany: {
        method: 'GET',
        path: '/',
      },
      findOne: {
        method: 'GET',
        path: '/:key',
      },
    },
  },
  adminAccountProviders: {
    basePath: 'admin/accounts/providers',
    routes: {
      create: {
        method: 'POST',
        path: '/',
      },
      delete: {
        method: 'DELETE',
        path: '/:key',
      },
    },
  },
  accountToken: {
    basePath: 'accounts/:accountId/tokens',
    routes: {
      delete: {
        method: 'DELETE',
        path: '/',
      },
    },
  },
  auth: {
    basePath: 'auth',
    routes: {
      signUp: {
        method: 'POST',
        path: '/sign-up',
      },
      signIn: {
        method: 'POST',
        path: '/sign-in',
      },
      verifyEmail: {
        method: 'PUT',
        path: '/email/verify',
      },
    },
  },
  fileMetadata: {
    basePath: 'users/:userId/files/:fileId/metadata',
    routes: {
      findById: {
        method: 'GET',
        path: '/',
      },
      createMetadata: {
        method: 'POST',
        path: '/',
      },
      deleteMetadataById: {
        method: 'DELETE',
        path: '/:metadataId',
      },
    },
  },
  adminFileMetadata: {
    basePath: 'admin/files/:fileId/metadata',
    routes: {
      findByFileId: {
        method: 'GET',
        path: '/',
      },
      createMetadata: {
        method: 'POST',
        path: '/',
      },
      deleteMetadataById: {
        method: 'DELETE',
        path: '/:metadataId',
      },
    },
  },
  file: {
    basePath: 'users/:userId/files',
    routes: {
      uploadFile: {
        path: '/upload/image',
        method: 'POST',
      },
      generateSignature: {
        method: 'POST',
        path: '/upload/video/signature',
      },
      findById: {
        method: 'GET',
        path: '/:fileId',
      },
      findByProviderId: {
        method: 'GET',
        path: '/providers/:providerId',
      },
      findUserFiles: {
        method: 'GET',
        path: '/',
      },
      deleteUserFile: {
        method: 'DELETE',
        path: '/:fileId',
      },
      updateFile: {
        method: 'PATCH',
        path: '/:fileId',
      },
    },
  },
  adminFile: {
    basePath: 'admin/files',
    routes: {
      deleteFile: {
        method: 'DELETE',
        path: '/:fileId',
      },
      findById: {
        method: 'GET',
        path: '/:fileId',
      },
      findByProviderId: {
        method: 'GET',
        path: '/providers/:providerId',
      },
      findUserFile: {
        method: 'GET',
        path: '/authors/:authorId',
      },
      updateUserFile: {
        method: 'PUT',
        path: '/:fileId',
      },
    },
  },
  postFiles: {
    basePath: 'posts/:postId/files',
    routes: {
      findPostFiles: {
        method: 'GET',
        path: '/',
      },
      createPostFiles: {
        method: 'POST',
        path: '/',
      },
      deletePostFiles: {
        method: 'DELETE',
        path: '/',
      },
    },
  },
  post: {
    basePath: '',
    routes: {
      findPostById: {
        method: 'GET',
        path: '/posts/:postId',
      },
      findPosts: {
        method: 'GET',
        path: '/posts',
      },
      findUserPosts: {
        method: 'GET',
        path: '/users/:userId/posts',
      },
      create: {
        method: 'POST',
        path: '/posts',
      },
      delete: {
        method: 'DELETE',
        path: '/posts/:postId',
      },
      update: {
        method: 'PATCH',
        path: '/posts/:postId',
      },
    },
  },
  publication: {
    basePath: 'posts/:postId/publications',
    routes: {
      create: {
        method: 'POST',
        path: '/',
      },
      update: {
        method: 'PATCH',
        path: '/:publicationId',
      },
      delete: {
        method: 'DELETE',
        path: '/:publicationId',
      },
      findOne: {
        method: 'GET',
        path: '/:publicationId',
      },
      findMany: {
        method: 'GET',
        path: '/',
      },
    },
  },
  publicationFiles: {
    basePath: 'posts/:postId/publications/:publicationId/files',
    routes: {
      findPublicationFiles: {
        method: 'GET',
        path: '/',
      },
      createPublicationFiles: {
        method: 'POST',
        path: '/',
      },
      deletePublicationFiles: {
        method: 'DELETE',
        path: '/',
      },
    },
  },
  publicationProviders: {
    basePath: '',
    routes: {
      create: {
        method: 'POST',
        path: '/publication/providers',
      },
      delete: {
        method: 'DELETE',
        path: '/publication/providers/:key',
      },
      findOne: {
        method: 'GET',
        path: '/publication/providers/:key',
      },
      findMany: {
        method: 'GET',
        path: '/publication/providers',
      },
      findManyByAccountProvider: {
        method: 'GET',
        path: '/accounts/providers/:accountProviderId/publications/providers',
      },
    },
  },
  publisher: {
    basePath: 'posts/:postId/publications/:publicationId/publish',
    routes: {
      createPublish: {
        method: 'POST',
        path: '/',
      },
    },
  },
  roles: {
    basePath: 'roles',
    routes: {
      findRole: {
        method: 'GET',
        path: '/:role',
      },
      findRoles: {
        method: 'GET',
        path: '/',
      },
    },
  },
  adminRoles: {
    basePath: 'admin/roles',
    routes: {
      findRole: {
        method: 'GET',
        path: '/:role',
      },
      findRoles: {
        method: 'GET',
        path: '/',
      },
      createRole: {
        method: 'POST',
        path: '/',
      },
      deleteRole: {
        method: 'DELETE',
        path: '/:role',
      },
    },
  },
  user: {
    basePath: 'users',
    routes: {
      findUserById: {
        path: '/:userId',
        method: 'GET',
      },
      updateUser: {
        method: 'PATCH',
        path: '/:userId',
      },
      deleteUser: {
        method: 'DELETE',
        path: '/:userId',
      },
    },
  },
  adminUser: {
    basePath: 'admin/users',
    routes: {
      findUserById: {
        method: 'GET',
        path: '/:userId',
      },
      updateUser: {
        method: 'PATCH',
        path: '/:userId',
      },
      deleteUser: {
        method: 'DELETE',
        path: '/:userId',
      },
    },
  },
  adminUserRole: {
    basePath: 'admin/users/:userId/roles',
    routes: {
      createUserRole: {
        method: 'POST',
        path: '/',
      },
      findUserRole: {
        method: 'GET',
        path: '/',
      },
      deleteUserRole: {
        method: 'DELETE',
        path: '/',
      },
      updateUserRole: {
        method: 'PATCH',
        path: '/',
      },
    },
  },
  userRole: {
    basePath: 'users/:userId/roles',
    routes: {
      findUserRole: {
        method: 'GET',
        path: '/',
      },
    },
  },
  workspace: {
    basePath: 'workspaces',
    routes: {
      findById: {
        method: 'GET',
        path: '/:workspaceId',
      },
      createWorkspace: {
        method: 'POST',
        path: '/',
      },
      deleteWorkspace: {
        method: 'DELETE',
        path: '/:workspaceId',
      },
    },
  },
  adminRoleWorkspace: {
    basePath: 'admin/workspace-roles',
    routes: {
      findByRole: {
        method: 'GET',
        path: '/:role',
      },
      createRole: {
        method: 'POST',
        path: '/',
      },
      deleteRole: {
        method: 'DELETE',
        path: '/:role',
      },
    },
  },
  workspaceUser: {
    basePath: 'workspaces/:workspaceId/users',
    routes: {
      createWorkspaceUser: {
        path: '/',
        method: 'POST',
      },
      deleteWorkspaceUser: {
        method: 'DELETE',
        path: '/:userId',
      },
      updateWorkspaceUser: {
        method: 'PATCH',
        path: '/:userId',
      },
      findWorkspaceUser: {
        method: 'GET',
        path: '/:userId',
      },
      findWorkspaceUsers: {
        method: 'GET',
        path: '/',
      },
    },
  },
};

export { HttpMethod }
