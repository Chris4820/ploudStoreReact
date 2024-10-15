import React from 'react';
import { Control, useController } from 'react-hook-form';
import { RoleFormData } from '../Schema/RoleSchema';

interface CheckBoxPermissionProps {
  label: string;
  value: string;
  control: Control<RoleFormData>;
}

const CheckBoxPermissionComponent: React.FC<CheckBoxPermissionProps> = ({ label, value, control }) => {
  const { field } = useController({
    name: "permissions",
    control,
    defaultValue: [],
  });

  const isChecked = field.value.includes(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPermissions = e.target.checked
      ? [...field.value, value]
      : field.value.filter((permission: string) => permission !== value);
    field.onChange(updatedPermissions);
  };

  return (
    <li>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
        <span>{label}</span>
      </label>
    </li>
  );
};

export default CheckBoxPermissionComponent;