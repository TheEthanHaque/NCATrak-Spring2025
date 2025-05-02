# Introduction

Hello, this is Victor. I worked on this project over Spring 2025. I will have graduated after this, but here are some directions and ideas for the future of the project.

This document includes my recommendations based on my work and experience with the codebase. If you have any questions, please consult mentors or refer to the previous semester’s documentation.

# Systems

## File System Overview

It's worth your time to familiarize yourself with the file system. Here’s a quick overview of important parts:

- **wizard.py**: Main script for populating the database. Keep this updated and functional with any new changes to ensure compatibility with ongoing development.
- **app/api/**: API files are located here.
- **frontend/api/**: Frontend-related API files.
- **AOI Files**: Currently also reside under `app/api/`.

## Database

New and more detailed scenarios from mentors may require changes to the existing database schema. Keep an updated ER diagram as a visual reference for schema changes.

Make sure to:

- Test the schema frequently, especially after changes.
- Maintain compatibility with legacy data while integrating new data structures.

## wizard.py

This script handles the database population process and testing. It's important that:

- New features are integrated into this pipeline.
- It remains functional and up to date with the rest of the codebase.

## Future Suggestions

# Known Issues & Bug Reports

As of the end of Spring 2025, the following issues have been identified and remain unresolved. These should be reviewed and prioritized by future development teams.

## Scenario 1 and Scenario 3 – Case Retrieval

There is an active bug affecting case retrieval for certain individuals in Scenario 1 and Scenario 3. This may be related to the way **Case CAC numbers** and **Case IDs** are associated with people in the database. Further investigation into the schema relationships and query logic is recommended.

## Scenario 2 – Add Person Feature

The "Add Person" functionality in Scenario 2 has not been implemented. The team encountered blockers that prevented successful completion. Implementing and testing this feature would be an ideal first task for the next group.

## Scenario 5 – Pick List Sorting

In Scenario 5, the sorting of pick list items is not functioning correctly. While this is not critical to the application's core logic, it does create a discrepancy between the expected behavior (based on the mock system) and the current implementation in NCATrak.

The issue appears to stem from the improper handling of `item_id` values when items are moved or reordered. Addressing this bug would improve usability and bring the application closer to parity with its original mock-up.

### Update Script

Consider writing an update script that can handle database migrations, schema updates, and test reinitialization. This will make development and deployment more streamlined.

### Refer to Fall 2024 Docs

Zane’s group created thorough documentation that you can find here: [Fall 2024 Repository](https://github.com/ZaneLesley/NCATrak-Mock-System). Reviewing this will save time and prevent duplicate efforts.

# Recommendations

## Version Control

- Use version control responsibly.
- Create feature branches and pull requests for better tracking and review.
- Even changes to ports or API endpoints can break functionality—treat each change with care.

## Documentation

- Start early and document often.
- Good documentation is invaluable to mentors and future developers.
- Focus on documenting structure, expectations, and known bugs.

## Interface & AOIs

The interface is expected to evolve to support AOI (Area of Interest) tracking. Be ready to:

- Divide screens into grid/box zones.
- Track keylogging and mouse movement in those areas.
- Log these events in a detailed format.

## Prioritization

Work on mentor-assigned tasks first, and fix existing bugs before implementing new features. Suggested workflow:

1. Address mentor goals.
2. Fix bugs or stability issues.
3. Add quality-of-life tools like update scripts or database utilities.

# Final Thoughts

Good luck! Keep communication open with mentors and your team. A clean commit history, organized project structure, and consistent documentation will make your life and the next developer's much easier.