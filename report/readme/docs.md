## Authorization Rules

| Route              | Allowed Users                  | Rules                                                                 |
|--------------------|--------------------------------|------------------------------------------------------------------------|
| PUT /api/cat/:id   | Cat owner or admin             | Update allowed only if the user is the cat's owner or has admin role. |
| DELETE /api/cat/:id| Cat owner or admin             | Delete allowed only if the user is the cat's owner or has admin role. |
| PUT /api/users/:id | The user themself or admin     | User may update only their own profile unless they are an admin.      |
