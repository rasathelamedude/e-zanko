import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { LetterActionType } from "../../types/letter";

interface LetterPayloadFieldsProps {
  action: LetterActionType;
  values: Record<string, string | number | null | undefined>;
  onChange: (field: string, value: string) => void;
  departmentId?: string | number | null;
}

function LetterPayloadFields({
  action,
  values,
  onChange,
  departmentId,
}: LetterPayloadFieldsProps) {
  // Helper function to view input fields based on the action type
  const renderField = (
    label: string,
    field: string,
    type: "text" | "email" | "password" | "number" = "text",
    placeholder = "",
  ) => (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <Input
        type={type}
        value={values[field] ?? ""}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );

  switch (action) {
    case "hire_teacher":
      return (
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <div className="mb-3 text-sm font-semibold text-foreground">
            Lecturer details
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderField("Full name", "name", "text", "e.g. Jessi")}
            {renderField("Email", "email", "email", "jessi@gmail.com")}
            {renderField("Phone", "phone", "text", "e.g. 07705542525")}
            {renderField("Title", "title", "text", "e.g. Professor")}
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-foreground">
                Speciality
              </Label>
              <Input
                value={values.speciality ?? ""}
                onChange={(e) => onChange("speciality", e.target.value)}
                placeholder="e.g. Computer Science"
              />
            </div>
          </div>
        </div>
      );

    case "fire_teacher":
      return (
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <div className="mb-3 text-sm font-semibold text-foreground">
            Lecturer details
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderField("Full name", "name", "text", "e.g. Jessi")}
            {renderField("Email", "email", "email", "jessi@gmail.com")}
            {renderField(
              "Department ID",
              "department_id",
              "number",
              departmentId ? String(departmentId) : "1",
            )}
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-foreground">
                Reason
              </Label>
              <Input
                value={values.reason ?? ""}
                onChange={(e) => onChange("reason", e.target.value)}
                placeholder="e.g. Policy violation"
              />
            </div>
          </div>
        </div>
      );

    case "create_department":
      return (
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <div className="mb-3 text-sm font-semibold text-foreground">
            Department details
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderField(
              "Department name",
              "name",
              "text",
              "e.g. Computer Science",
            )}
            {renderField("Faculty ID", "faculty_id", "number", "1")}
            {renderField(
              "Department head",
              "head_name",
              "text",
              "e.g. Dr. Ali",
            )}
            {renderField("Code", "code", "text", "CS")}
          </div>
        </div>
      );

    case "close_department":
      return (
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <div className="mb-3 text-sm font-semibold text-foreground">
            Department details
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderField(
              "Department name",
              "name",
              "text",
              "e.g. Computer Science",
            )}
            {renderField("Faculty ID", "faculty_id", "number", "1")}
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-foreground">
                Reason
              </Label>
              <Input
                value={values.reason ?? ""}
                onChange={(e) => onChange("reason", e.target.value)}
                placeholder="e.g. Program consolidation"
              />
            </div>
          </div>
        </div>
      );

    case "open_faculty":
      return (
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <div className="mb-3 text-sm font-semibold text-foreground">
            Faculty details
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderField("Faculty name", "name", "text", "e.g. Engineering")}
            {renderField("Dean name", "dean_name", "text", "e.g. Dr. Soran")}
            {renderField("University ID", "university_id", "number", "1")}
          </div>
        </div>
      );

    case "close_faculty":
      return (
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <div className="mb-3 text-sm font-semibold text-foreground">
            Faculty details
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderField("Faculty name", "name", "text", "e.g. Engineering")}
            {renderField("University ID", "university_id", "number", "1")}
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-foreground">
                Reason
              </Label>
              <Input
                value={values.reason ?? ""}
                onChange={(e) => onChange("reason", e.target.value)}
                placeholder="e.g. Reorganization"
              />
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default LetterPayloadFields;
