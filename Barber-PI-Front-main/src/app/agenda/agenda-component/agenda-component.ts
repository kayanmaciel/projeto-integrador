import { Component, OnInit } from '@angular/core';
import { AgendamentoService, Agendamento } from '../../api/agenda/agenda';
import { ServicoService, Servico } from '../../api/services/services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agenda-component',
  standalone: false,
  templateUrl: './agenda-component.html',
  styleUrl: './agenda-component.css'
})
export class AgendaComponent implements OnInit {

  constructor(
    private agendamentoService: AgendamentoService,
    private servicoService: ServicoService,
    private location: Location
  ) {}

  // -------------------------------------
  // CAMPOS PRINCIPAIS
  // -------------------------------------
  currentMonth = new Date();
  selectedDate = new Date();

  weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  days: any[] = [];

  agendamentos: Agendamento[] = [];
  filteredEvents: any[] = [];

  scheduleSlots: string[] = [];
  selectedSlot: string | null = null;

  services: Servico[] = [];
  selectedService: Servico | null = null;

  ngOnInit() {
    this.carregarServicos();
    this.carregarAgendamentos();
    this.generateCalendar(this.currentMonth);
    this.generateScheduleSlots();
    this.filterEvents(this.selectedDate);
  }

  // -------------------------------------
  // SERVIÇOS
  // -------------------------------------
  carregarServicos() {
    this.servicoService.listarTodos().subscribe({
      next: (lista) => {
        this.services = lista.filter(s => s.status === 'ativo');
      },
      error: (err) => console.error("Erro ao carregar serviços:", err)
    });
  }

  // -------------------------------------
  // AGENDAMENTOS
  // -------------------------------------
  carregarAgendamentos() {
    this.agendamentoService.listarTodos().subscribe({
      next: (lista) => {
        this.agendamentos = lista.map(a => ({
          ...a,
          dateObj: new Date(a.dataHora)   // usamos isso só no front
        }));

        console.log('Agendamentos carregados:', this.agendamentos);

        // Atualiza calendário e eventos do dia
        this.generateCalendar(this.currentMonth);
        this.filterEvents(this.selectedDate);
      },
      error: (err) => console.error("Erro ao carregar agendamentos:", err)
    });
  }

  // -------------------------------------
  // HORÁRIOS
  // -------------------------------------
  generateScheduleSlots() {
    const startHour = 8;
    const endHour = 18.5;
    const lunchStart = 11.5;
    const lunchEnd = 12.5;

    const slots: string[] = [];

    for (let t = startHour; t <= endHour; t += 1) {
      const isLunch = t >= lunchStart && t < lunchEnd;
      if (!isLunch) slots.push(this.formatTime(t));
    }

    this.scheduleSlots = slots;
  }

  formatTime(decimal: number): string {
    const h = Math.floor(decimal);
    const m = decimal % 1 === 0 ? '00' : '30';
    return `${h.toString().padStart(2, '0')}:${m}`;
  }

  horarioOcupado(slot: string): boolean {
    return this.agendamentos.some(a => {
      const d = a.dateObj;
      if (!d) return false;

      const hh = d.getHours().toString().padStart(2, '0');
      const mm = d.getMinutes().toString().padStart(2, '0');
      const time = `${hh}:${mm}`;

      return d.toDateString() === this.selectedDate.toDateString() && time === slot;
    });
  }

  selectSlot(slot: string) {
    if (this.horarioOcupado(slot)) {
      alert("Horário já ocupado!");
      return;
    }
    this.selectedSlot = slot;
    this.selectedService = null;
  }

  selectService(serv: Servico) {
    this.selectedService = serv;
  }

  // -------------------------------------
  // CALENDÁRIO (VERSÃO ANTIGA, CERTINHA)
  // -------------------------------------
  generateCalendar(date: Date) {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    this.days = [];

    // Dias do mês anterior para preencher a primeira linha
    const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      const d = new Date(date.getFullYear(), date.getMonth() - 1, prevMonthLastDay - i);
      this.days.push({ date: d, number: d.getDate(), isOtherMonth: true });
    }

    // Dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(date.getFullYear(), date.getMonth(), i);

      const hasEvent = this.agendamentos.some(a =>
        a.dateObj && a.dateObj.toDateString() === d.toDateString()
      );

      this.days.push({
        date: d,
        number: i,
        isOtherMonth: false,
        hasEvents: hasEvent,
        eventColor: hasEvent ? '#6b4eff' : ''
      });
    }

    // Preenche o restante até 42 células
    const nextDaysCount = 42 - this.days.length;
    for (let i = 1; i <= nextDaysCount; i++) {
      const d = new Date(date.getFullYear(), date.getMonth() + 1, i);
      this.days.push({ date: d, number: d.getDate(), isOtherMonth: true });
    }
  }

  previousMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.generateCalendar(this.currentMonth);
    this.filterEvents(this.selectedDate);
  }

  nextMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.generateCalendar(this.currentMonth);
    this.filterEvents(this.selectedDate);
  }

  selectDay(date: Date) {
    this.selectedDate = date;
    this.selectedSlot = null;
    this.selectedService = null;
    this.filterEvents(date);
  }

  // -------------------------------------
  // EVENTOS DO DIA
  // -------------------------------------
  filterEvents(date: Date) {
    this.filteredEvents = this.agendamentos
      .filter(a => a.dateObj && a.dateObj.toDateString() === date.toDateString())
      .map(a => ({
        id: a.id,
        date: a.dateObj!,
        servicoId: a.servico.id,
        title: a.servico.nome,
        time: a.dateObj!.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        color: '#6b4eff'
      }));
  }

  isToday(date: Date): boolean {
    const t = new Date();
    return date.toDateString() === t.toDateString();
  }

  // -------------------------------------
  // SALVAR
  // -------------------------------------
  save() {
    if (!this.selectedDate || !this.selectedSlot || !this.selectedService) {
      alert("Selecione data, horário e serviço.");
      return;
    }

    const [h, m] = this.selectedSlot.split(":");
    const dataHora = new Date(this.selectedDate);
    dataHora.setHours(Number(h), Number(m), 0);

    const iso = `${dataHora.getFullYear()}-${(dataHora.getMonth()+1)
      .toString().padStart(2,'0')}-${dataHora.getDate()
      .toString().padStart(2,'0')}T${h}:${m}`;

    const payload = {
      dataHora: iso,
      status: 'pendente',
      observacoes: '',
      usuario: { id: 1 },
      servico: { id: this.selectedService.id }
    };

    this.agendamentoService.criar(payload).subscribe({
      next: () => {
        alert("Agendamento criado!");
        this.carregarAgendamentos();
      },
      error: () => alert("Erro ao criar agendamento.")
    });
  }

  // -------------------------------------
  // CANCELAR
  // -------------------------------------
  cancelar(event: any) {
    if (!confirm("Deseja cancelar este agendamento?")) return;

    this.agendamentoService.deletar(event.id).subscribe({
      next: () => {
        alert("Cancelado.");
        this.carregarAgendamentos();
      },
      error: () => alert("Erro ao cancelar.")
    });
  }

  // -------------------------------------
  // REMARCAR
  // -------------------------------------
  remarcar(event: any) {
    this.selectedDate = new Date(event.date);
    this.selectedSlot = event.time;
    this.selectedService = this.services.find(s => s.id === event.servicoId) || null;

    alert("Selecione outro horário e clique em Confirmar para remarcar.");
  }

}
