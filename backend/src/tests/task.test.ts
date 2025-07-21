// task.test.ts
import { body, validationResult } from 'express-validator';

describe('Validación de título de tarea', () => {
  it('Debe fallar si el título es muy corto', async () => {
    const req: any = { body: { title: 'a' } };
    await body('title').isLength({ min: 3, max: 100 }).run(req);
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false); // esperamos que falle
  });

  it('Debe pasar si el título es válido', async () => {
    const req: any = { body: { title: 'Mi tarea buena' } };
    await body('title').isLength({ min: 3, max: 100 }).run(req);
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true); // esperamos que pase
  });
});
