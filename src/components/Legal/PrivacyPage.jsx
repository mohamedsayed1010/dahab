import LegalLayout, { LegalSection } from "./LegalLayout";

// Conservative, truthful privacy notice describing only what the frontend
// actually does: collects a name + phone at sign-in, and stores login tokens,
// the chosen theme, and a cached price locally in the browser. No claims are
// made about specific retention periods, third-party processors, or payments.
export default function PrivacyPage() {
  return (
    <LegalLayout title="سياسة الخصوصية" updated="سبتمبر ٢٠٢٦">
      <p>
        تشرح هذه السياسة البيانات التي يجمعها تطبيق «دهب العربي» وكيفية
        استخدامها. نحرص على جمع أقل قدر ممكن من البيانات اللازمة لتشغيل الخدمة.
      </p>

      <LegalSection title="البيانات التي نجمعها">
        <p>
          عند تسجيل الدخول نطلب منك الاسم ورقم الموبايل فقط. لا نطلب كلمة مرور،
          ولا نجمع بيانات بطاقات بنكية أو بيانات دفع داخل التطبيق.
        </p>
      </LegalSection>

      <LegalSection title="الغرض من الاستخدام">
        <p>
          تُستخدم بياناتك لتمكينك من تسجيل الدخول ومتابعة أسعار الذهب والفضة
          والمنتجات المعروضة. لا نبيع بياناتك لأي جهة.
        </p>
      </LegalSection>

      <LegalSection title="التخزين على جهازك">
        <p>
          يقوم التطبيق بحفظ بعض المعلومات محليًا في متصفّحك (Local Storage) لتشغيل
          الخدمة، وتشمل: بيانات تسجيل الدخول (رموز الجلسة والاسم ورقم الموبايل)،
          وتفضيل المظهر (فاتح/داكن)، وآخر سعر تم عرضه للأونصة. تبقى هذه المعلومات
          على جهازك ويمكنك حذفها في أي وقت.
        </p>
      </LegalSection>

      <LegalSection title="الاتصال بالخوادم">
        <p>
          لعرض الأسعار المحدّثة، يتواصل التطبيق مع خوادم الخدمة لجلب بيانات
          الأسعار والمنتجات. تُرسَل بيانات تسجيل الدخول إلى الخادم للتحقق من
          الدخول فقط.
        </p>
      </LegalSection>

      <LegalSection title="القنوات الخارجية">
        <p>
          يحتوي التطبيق على روابط لقنوات خارجية للتواصل (مثل تيليجرام وواتساب
          والهاتف وخرائط جوجل). عند الانتقال إليها تخضع لسياسات الخصوصية الخاصة
          بتلك الجهات، ولسنا مسؤولين عنها.
        </p>
      </LegalSection>

      <LegalSection title="التحكم في بياناتك">
        <p>
          يمكنك تسجيل الخروج لمسح بيانات الدخول المحفوظة على جهازك، أو مسح بيانات
          الموقع من إعدادات المتصفّح في أي وقت.
        </p>
      </LegalSection>

      <LegalSection title="تحديث السياسة">
        <p>
          قد نُحدِّث هذه السياسة من وقت لآخر، ويسري أي تعديل فور نشره على هذه
          الصفحة.
        </p>
      </LegalSection>

      <LegalSection title="التواصل">
        <p>
          لأي استفسار بخصوص الخصوصية يمكنك التواصل معنا عبر قنوات التواصل
          الموضّحة في التطبيق.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
