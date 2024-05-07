"use server"
import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { Course } from '@prisma/client';

const courseSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(255),
    price: z.coerce.number().min(0).transform((val) => Number(val.toFixed(2))),
    userId: z.string().uuid(),
    couponId: z.string().uuid(),
    categoryId: z.string().uuid(),
    slug: z.string().min(3).max(100),
    tags: z.string()
})

export const createUpdateCourse = async (courseParam: FormData) => {
    const data = Object.fromEntries(courseParam);
    const courseParsed = courseSchema.safeParse(data);

    if (!courseParsed.success) {
        console.log(courseParsed.error);
        return { ok: false }
    }
    const course = courseParsed.data;
    course.slug = course.slug.toLowerCase().replace(/ /g, '-').trim();


    const { id, ...rest } = course;
    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            let course: Course
            const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

            if (id) { // update
                course = await tx.course.update({
                    where: { id },
                    data: {
                        ...rest,
                        tags: {
                            set: tagsArray
                        }
                    }
                })
            } else { //create
                course = await tx.course.create({
                    data: {
                        ...rest,
                        tags: {
                            set: tagsArray
                        }
                    }
                })
            }
        })

        revalidatePath('/admin/courses');
        revalidatePath(`/admin/course/${course.slug}`);
        revalidatePath(`/courses/${course.slug}`);


        return {
            ok: true,
            course: prismaTx
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Revisar los logs, no se pudo actualizar/crear'
        }
    }
}
