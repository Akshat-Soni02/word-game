# Contributing Guidelines

To ensure a smooth development, I do want myself to follow these standards.

---

## 📂 Branch Naming

Maintain clear, descriptive branch names for different purposes:

- **Feature branches**: `feat/<area>-<short-desc>`\
  *Example*: `feat/socket-joinRoom`
- **Bugfix branches**: `fix/<area>-<short-desc>`\
  *Example*: `fix/auth-token-expiry`
- **Hotfix branches** (for urgent fixes): `hotfix/<short-desc>`\
  *Example*: `hotfix/deployment-error`

### Main Branches

- `Main` – Always deployable, holds stable release code.
- `Develop` – Integration branch for current sprint’s features; merges into `main` when ready.

---

## ✏️ Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short summary>
```

*Example*:

```
feat(api)!: send an email when product is shipped
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code changes that neither fix a bug nor add a feature
- `test`: Adding or correcting tests
- `chore`: Build process or auxiliary tools changes

---

## 🔀 Pull Requests & Code Reviews

### PR Size

- Aim for small, focused PRs (< 200 lines changed).

### PR Description

- Clearly state the purpose of the change.
- List any new dependencies or environment variables.

