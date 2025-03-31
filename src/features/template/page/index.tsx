import { CheckCircle2, Pencil } from "lucide-react";
import HeaderSection from "../../../components/commons/Header";
import SubHeaderSection from "../../../components/commons/subHeader";
import { Button } from "../../../components/ui/button";

export default function TemplateIndexPage() {
  return (
    <>
      <HeaderSection
        title="Template"
        description="Gerencie seus designs!"
      />

      <div className="bg-muted p-3 w-full rounded-lg">
        <h1>Mais templates em breve...</h1>
      </div>

      <section className="mt-5">
        <SubHeaderSection
          title="Defaults"
          description="Use algum template nosso"
        />
      </section>

      <section className="mt-5">
        <SubHeaderSection
          title="Templates customizados"
          description="Crie, edite seu proprio template!"
        />

        <ul className="space-y-3">
          <li className="bg-muted w-full flex justify-between items-center p-4 rounded-md shadow-md hover:bg-muted/80 transition">
            <div>
              <h1 className="text-lg font-semibold">Copy of damerz</h1>
              <p className="text-sm text-muted-foreground">Um template customizado para começar rapidamente.</p>
            </div>

            <div className="flex gap-3 items-center">
              <Button size={"icon"} variant={"ghost"} className="bg-transparent hover:bg-violet-600/40 p-2 rounded-full">
                <Pencil className="w-full h-full" />
              </Button>
              <Button size={"icon"} variant={"ghost"} className="bg-transparent hover:bg-violet-600/40 p-2 rounded-full">
                <CheckCircle2 className="bg-transparent w-full h-full" />
              </Button>
            </div>
          </li>

          <li className="bg-muted w-full flex justify-between items-center p-4 rounded-md shadow-md hover:bg-muted/80 transition">
            <div>
              <h1 className="text-lg font-semibold">Copy of damerz</h1>
              <p className="text-sm text-muted-foreground">Um template customizado para começar rapidamente.</p>
            </div>

            <div className="flex gap-3 items-center">
              <Button size={"icon"} variant={"ghost"} className="bg-transparent hover:bg-violet-600/40 p-2 rounded-full">
                <Pencil className="w-full h-full" />
              </Button>
              <Button size={"icon"} variant={"ghost"} className="bg-transparent hover:bg-violet-600/40 p-2 rounded-full">
                <CheckCircle2 className="bg-transparent w-full h-full" />
              </Button>
            </div>
          </li>

        </ul>
      </section>
    </>
  );
}