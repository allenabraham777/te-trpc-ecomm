import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
    // Add dummy user
    await prisma.user.deleteMany();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const email = faker.internet.exampleEmail({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
    });
    const samplePassword = 'TestUser@123';
    const hashedPassword = await bcrypt.hash(samplePassword, 10);
    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            name,
            email,
            password: hashedPassword,
            verified: true,
        },
    });
    console.log(`Created user: ${user.name}, with email ${email}`);
    // Add 100 categories
    await prisma.category.deleteMany();
    const set = new Set();
    while (set.size < 100) {
        const category = `${faker.commerce.department()} ${faker.commerce.product()}`;
        if (!set.has(category)) {
            set.add(category);
            await prisma.category.upsert({
                where: { name: category },
                update: {},
                create: {
                    name: category,
                },
            });
            console.log(`Created category: ${category}`);
        }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
